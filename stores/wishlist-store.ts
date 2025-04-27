import { Product } from "@/shared/entities/Product";
import { persistentMap } from '@nanostores/persistent';


//Хранилище
export const wishlistStore = persistentMap<Record<number, Product>>(
  'wishlist:', //ключ для localStorage
  {},
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

if(typeof window !== 'undefined') {
  const storageKey = 'wishlist:';

  window.addEventListener('storage', (event)=>{
    if(event.key === storageKey) {
      const newValue = event.newValue ? JSON.parse(event.newValue) : {};
      wishlistStore.set(newValue);
    }
  });
}
//Проверяем, есть ли товар в вишлисте
export function isWhishlist(productId: number): boolean {
  return !!wishlistStore.get()[productId];
}

//Добавление товаров в вишлист
export function addToWishList(product: Product) {
  const existing = wishlistStore.get()[product.id];
  if (!existing) {
    wishlistStore.setKey(product.id, product);
  }
}
//Удаление товара из вишлиста
export function removeFromWhishlist(productId: number) {
  const current = { ...wishlistStore.get() };
  delete current[productId];
  wishlistStore.set(current);
}


//Получение количества товаров в вишлисте
export function getWishlistCount(): number {
  return Object.keys(wishlistStore.get()).length;
}
