'use client'
import { Product } from "@/shared/entities/Product";
import { persistentMap } from '@nanostores/persistent';


//Хранилище
export const wishlistStore = persistentMap<Record<number, Product>>(
  'wishlist:',
  {},
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

if(typeof window !== 'undefined') {
  window.addEventListener('storage', (event)=>{
    if(event.key === wishlistStore.key) {
      wishlistStore.set(JSON.parse(event.newValue || '{}'));
    }
  });
}
//Проверяем, есть ли товар в вишлисте
export function isWhishlist(productId: number): boolean {
  return !!wishlistStore.get()[productId];
}

//Добавление товаров в вишлист
export function addToWishList(product: Product) {
  const exesting = wishlistStore.get()[product.id];
  if (!exesting) {
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
