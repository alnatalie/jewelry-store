import { CartItem } from "@/shared/entities/CartItem";
import { Order } from "@/shared/entities/Order";
import { atom, onMount } from "nanostores";
import { remult } from "remult";




export const orderStore = atom<Order[]>([]);
export const isLoadingOrderStore = atom<boolean>(false);
export const errorOrderStore = atom<string | null>(null);

//Загрузка заказов пользователя
export const loadOrders = async () => {
    try{
        if (!remult.authenticated()) return;

        isLoadingOrderStore.set(true);
        errorOrderStore.set(null);
        const orders = await remult.repo(Order).find({
            where: {userId: remult.user?.id},
            orderBy: {createdAt: "desc"}
        });
        orderStore.set(orders);
    } catch(error) {
        errorOrderStore.set(error instanceof Error ? error.message : 'Не удалось загрузить заказы');
    } finally {
        isLoadingOrderStore.set(false);
    }
};

//Создание нового заказа

export const createOrder = async (cartItems: CartItem[]) => {
    try {
      if (!remult.authenticated()) {
        throw new Error("Для оформления заказа необходимо авторизоваться");
      }
  
      const currentUser = remult.user?.id;
      if (!currentUser) throw new Error("Не удалось определить пользователя");
  
      //Проверка, что корзина не пуста
      if (cartItems.length === 0) {
        throw new Error("Невозможно оформить пустой заказ");
      }
  
      //Подготовка данных заказа
      const orderItems = cartItems.map(item => ({
        productId: item.productId,
        productName: item.product?.name || 'Товар',
        price: item.price,
        quantity: item.quantity,
      }));
  
      const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
      //Создаем заказ
      const newOrder = await remult.repo(Order).insert({
        userId: currentUser,
        totalAmount,
        items: orderItems,
        createdAt: new Date()
      });
  
      //Обновляем список заказов
      await loadOrders();
      return newOrder;
    } catch (error) {
      console.error("Ошибка создания заказа:", error);
      errorOrderStore.set(error instanceof Error ? error.message : 'Не удалось создать заказ');
      throw error;
    } finally {
      isLoadingOrderStore.set(false);
    }
  };

//иницилизация 
onMount(orderStore, ()=>{
    loadOrders();
    return ()=> orderStore.set([]);
});