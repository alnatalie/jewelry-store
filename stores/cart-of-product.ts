import { CartItem } from "@/shared/entities/CartItem"
import { atom, onMount } from "nanostores";
import { remult } from "remult";




//Хранилище корзины
export const cartStore = atom<CartItem[]>([]);
export const isLoadingStore = atom<boolean>(false);
export const errorStore = atom<string | null>(null);

//Загрузка корзины с сервера
export const loadCart = async()=>{
    try{
        isLoadingStore.set(true);
        errorStore.set(null);
        const items = await remult.repo(CartItem).find({
            include: {
                product: true
            }
        })
        cartStore.set(items);
    } catch(error) {
        errorStore.set(error instanceof Error ? error.message : 'Unknow error');
    } finally {
        isLoadingStore.set(false);
    }
};

//Добавление в корзину
export const addToCart = async (product : {id: number, name: string, price: number}) => {
    try {
        if(!remult.authenticated()){
            throw new Error("Для добавления в корзину необходимо авторизоваться")
        };
        
        isLoadingStore.set(true);
        const currentUser = remult.user?.id;

        if(!currentUser){
            throw new Error("Не удалось определить пользователя");
        }
       

        //Проверка, есть ли уже такой товар в корзине
        const existingItem = cartStore.get().find(item => 
            item.productId === product.id && item.userId === currentUser
        );

        if(existingItem) {
            //Обновляем количество
            const updatedItem = await remult.repo(CartItem).save({...existingItem, quantity: existingItem.quantity + 1});

            cartStore.set(cartStore.get().map(item=> item.id === updatedItem.id ? updatedItem : item));
        } else {
            //Добавляем новый товар
            const newItem = await remult.repo(CartItem).save({
                id: Math.random().toString(36).substring(2,9),
                productId: product.id,
                iserId: currentUser,
                quantity:1,
                createdAt: new Date()
            } as CartItem);

            cartStore.set([...cartStore.get(), newItem]);
        }         
    } catch(error) {
        errorStore.set(error instanceof Error ? error.message : 'Failed to add cart');
    } finally {
        isLoadingStore.set(false);
    }
};

//Удаление из корзины 
export const removeFromCart = async (itemId: string) => {
    try {
        isLoadingStore.set(true);
        await remult.repo(CartItem).delete(itemId);
        cartStore.set(cartStore.get().filter( item  =>item.id !== itemId));
    } catch(error) {
        errorStore.set(error instanceof Error ? error.message : 'Failed to remove item');
    } finally {
        isLoadingStore.set(false);
    }
};

//Очистка корзины

export const clearCart = async ()=>{
    try{
        isLoadingStore.set(true);
        await remult.repo(CartItem).deleteAll();
        cartStore.set([]);
    } catch(error) {
        errorStore.set(error instanceof Error ? error.message : 'Failed to clear cart');
    } finally {
        isLoadingStore.set(false);
    }
};

//Инцилизация корзины при загрузке
onMount(cartStore, ()=> {
    loadCart();
    return ()=> cartStore.set([]);
});



