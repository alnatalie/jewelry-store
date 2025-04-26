import { User } from "@/demo/auth/User";
import { Entity, Fields, Relations } from "remult";
import { Product } from "./Product";


@Entity('cart_item', {
    allowApiCrud: true

})

export class CartItem {
    @Fields.cuid()
    id!: string;
    
    @Fields.integer({allowNull: true})
    productId = 0;

    @Fields.string({allowNull: true})
    userId?:string;

    // @Fields.string()
    // name ='';   //Название дублируется для быстрого доступа

    @Fields.integer()
    price! :number; //Цена за еденицу товара на момент добавления

    @Fields.integer()
    quantity = 1; //Количество

    @Fields.date()
    createdAt = new Date(); //Дата добавления

    @Relations.toOne(()=> User, { field: "userId"})
    user?: User

    @Relations.toOne(()=> Product, {field:"productId"})
    product?: Product

    


}

