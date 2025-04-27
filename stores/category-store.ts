// import { Product } from "@/shared/entities/Product";
// import { atom } from "nanostores";

// export const filteredProductStore = atom<Product[]>([]);
// export const isCategoryLoadingStore = atom(false);
// export const catrgoryErrorStore = atom<string | null>(null);

// export const loadProductByCategory = async (categoryId: string) => {
//     try {
//         isCategoryLoadingStore.set(true);
//         catrgoryErrorStore.set(null);

//         const response = await fetch(`/api/products/category?categoryId=${categoryId}`);
//         if (!response.ok) {
//             throw new Error(`Failed to fetch products: ${response.status}`);
//         }
//         const products = await response.json();
//         filteredProductStore.set(products);
//     } catch (err: any) {
//         console.error("Error loading products:", err);
//         catrgoryErrorStore.set(err.message);
//     } finally {
//         isCategoryLoadingStore.set(false);
//     }
// };