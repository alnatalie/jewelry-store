
import { Product } from "@/shared/entities/Product";
import { atom, onMount } from "nanostores";
import { remult } from 'remult';
import { clearInterval } from "timers";

export const productStore = atom<Product[]>([]);
export const isLoadingStore = atom<boolean>(true);
export const errorStore = atom<string | null>(null);

//Загрузка товаров
export const loadProducts = async () => {
  try {
    isLoadingStore.set(true);
    errorStore.set(null);
    const data = await remult.repo(Product).find();
    productStore.set(data);
  } catch (err: any) {
    errorStore.set(err.message);
  } finally {
    isLoadingStore.set(false);
  }
};

//Автоматическая загрузка при инициализации стора
onMount(productStore, () => {
    const interval = setInterval(loadProducts, 60000);
  loadProducts(); //Первоначальная загрузка
  return () => {
    clearInterval(interval);
    productStore.set([]); //Очистка при демотнировании
  }
});
