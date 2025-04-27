import { CartItem } from "@/shared/entities/CartItem"
import { atom, onMount } from "nanostores";
import { remult } from "remult";




//Хранилище корзины
export const cartStore = atom<CartItem[]>([]);
export const isLoadingStore = atom<boolean>(false);
export const errorStore = atom<string | null>(null);


// Загрузка корзины с сервера
export const loadCart = async () => {
    try {
        isLoadingStore.set(true);
        errorStore.set(null);
        const items = await remult.repo(CartItem).find({
            where: { userId: remult.user?.id },
            include: { product: true }
        });
        cartStore.set(items);
    } catch (error) {
        errorStore.set(error instanceof Error ? error.message : 'Неизвестная ошибка');
    } finally {
        isLoadingStore.set(false);
    }
};

// Добавление в корзину

export const addToCart = async (product: { id: number, name: string, price: number }) => {
    try {
        if (!remult.authenticated()) {
            return { success: false, message: "Пожалуйста, авторизуйтесь, чтобы добавить в корзину" };
        }

        isLoadingStore.set(true);
        const currentUser = remult.user?.id;

        if (!currentUser) {
            throw new Error("Не удалось определить пользователя");
        }

        
        const existingItem = await remult.repo(CartItem).findFirst({
            productId: product.id,
            userId: currentUser
        });
        
        if (existingItem) {
            const updatedItem = await remult.repo(CartItem).save({
                ...existingItem,
                quantity: existingItem.quantity + 1
            });
            cartStore.set(cartStore.get().map(item => item.id === updatedItem.id ? updatedItem : item));
        } else {
            const newItem = await remult.repo(CartItem).insert({
                productId: product.id,
                userId: currentUser,
                quantity: 1,
                createdAt: new Date(),
                price: product.price,
            });
            cartStore.set([...cartStore.get(), newItem]);
        }

        return { success: true };
    } catch (error) {
        console.error('Ошибка при добавлении в корзину:', error);
        errorStore.set(error instanceof Error ? error.message : 'Не удалось добавить в корзину');
        throw error;
    } finally {
        isLoadingStore.set(false);
    }
};












// export const addToCart = async (product: { id: number, name: string, price: number }) => {
//     try {
//         if (!remult.authenticated()) {
//             throw new Error("Для добавления в корзину необходимо авторизоваться");
//         }

//         isLoadingStore.set(true);
//         const currentUser = remult.user?.id;

//         if (!currentUser) {
//             throw new Error("Не удалось определить пользователя");
//         }

//         // Проверка, есть ли уже такой товар в корзине
//         const existingItem = await remult.repo(CartItem).findFirst({
//             productId: product.id,
//             userId: currentUser
//         });
//         if (existingItem) {
//             // Обновляем количество
//             const updatedItem = await remult.repo(CartItem).save({
//                 ...existingItem,
//                 quantity: existingItem.quantity + 1
//             });
//             cartStore.set(cartStore.get().map(item => item.id === updatedItem.id ? updatedItem : item));
//         } else {
//             // Добавляем новый товар
//             const newItem = await remult.repo(CartItem).insert({
//                 productId: product.id,
//                 userId: currentUser,
//                 quantity: 1,
//                 createdAt: new Date(),
//                 price: product.price,
//             });

//             cartStore.set([...cartStore.get(), newItem]);
//         }
//     } catch (error) {
//         console.error('Ошибка при добавлении в корзину:', error);
//         errorStore.set(error instanceof Error ? error.message : 'Не удалось добавить в корзину');
//         throw error;
//     } finally {
//         isLoadingStore.set(false);
//     }
// };


//Удаление из корзины 
export const removeFromCart = async (itemId: string) => {
    try {
        isLoadingStore.set(true);
        await remult.repo(CartItem).delete(itemId);
        cartStore.set(cartStore.get().filter( item  =>item.id !== itemId));
    } catch(error) {
        errorStore.set(error instanceof Error ? error.message : 'Не удалось удалить элемент');
    } finally {
        isLoadingStore.set(false);
    }
};

//Очистка корзины

export const clearCart = async ()=>{
    try{
        isLoadingStore.set(true);
        // Получаем все элементы корзины текущего пользователя
        const itemsToDelete = await remult.repo(CartItem).find({
            where: {userId : remult.user?.id}
        });

        // Удаляем каждый элемент по отдельности
        await Promise.all(itemsToDelete.map(item => remult.repo(CartItem).delete(item.id)));

        cartStore.set([]);
    } catch(error) {
        errorStore.set(error instanceof Error ? error.message : 'Не удалось очистить корзину');
    } finally {
        isLoadingStore.set(false);
    }
};

//Инцилизация корзины при загрузке
onMount(cartStore, ()=> {
    loadCart();
    return ()=> cartStore.set([]);
});



