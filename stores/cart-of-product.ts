import { CartItem } from "@/shared/entities/CartItem"
import { persistentMap } from '@nanostores/persistent';
import { useStore } from "@nanostores/react";
import { remult } from "remult";

export const cartStore = persistentMap<Record<string, Omit<CartItem, 'createdAt'>>> (
    'cart:',
    {},
    {
        encode : JSON.stringify,
        decode: JSON.parse,
    }
)

//Функция для синхронизации с JSON-файлом

const syncCartWithJson = async (cartData : Record<string, Omit<CartItem, 'createdAt'>>) =>{
    try{
        await remult.repo(CartItem).delete({}); //Очищаем старые данные
        const items = Object.values(cartData);
        await remult.repo(CartItem).insert(items); //Записываем новые
    } catch (error) {
        console.error('Ошибка синхронизации корзины', error);
    }
};

export const addToCart = async (product: Omit<CartItem, 'quantity' | 'createdAt'>) => {
    const current = cartStore.get();
    const newCart = {
        ...current,
        [product.id] : {
            ...product,
            quantity: current[product.id]?.quantity + 1 || 1,
        },
    };
    
    cartStore.set(newCart);
    await syncCartWithJson(newCart); //Синхронизация с JSON
};

export const useCart = () => useStore(cartStore);

