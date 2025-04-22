
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
  let intervalId: number | null = null;
  
  // Первая загрузка
  loadProducts();
  
  // Устанавливаем интервал только в браузерном окружении
  if (typeof window !== 'undefined') {
    intervalId = window.setInterval(loadProducts, 60000);
  }

  return () => {
    // Безопасная очистка интервала
    if (intervalId !== null) {
      window.clearInterval(intervalId);
    }
    productStore.set([]);
  };
});
