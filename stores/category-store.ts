import { Product } from "@/shared/entities/Product";
import { atom } from "nanostores";
import { remult } from "remult";



export const filteredProductStore = atom<Product[]>([]);
export const isCategoryLoadingStore = atom(false);
export const catrgoryErrorStore = atom<string | null>(null);


export const loadProductByCategory = async (categoryId: string) => {
    try {
        isCategoryLoadingStore.set(true);
        catrgoryErrorStore.set(null);

        const products = await remult.repo(Product).find({
            where:{categoryId},
            include:{category: true, material: true}
        });

        filteredProductStore.set(products);
    } catch (err : any) {
        catrgoryErrorStore.set(err.message);
    } finally {
        isCategoryLoadingStore.set(false);
    }
};