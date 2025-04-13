'use client'
import { Product } from "@/shared/entities/Product"
import { remult } from "remult";



export default async function ProductPage({params} : {params:Promise<{id:string}>}) {
    const id = (await params)?.id.trim();
    const product = await remult.repo(Product).findId(Number(params.id))

    if(!product) {
        return <div>Товар не найден</div>
    }
    return <>
        
    </>
}