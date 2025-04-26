import { User } from "@/demo/auth/User";
import { Entity, Fields, Relations } from "remult";




@Entity('order', {
    allowApiCrud: true
})

export class Order {
    @Fields.cuid()
    id!:string;

    @Fields.string()
    userId!: string;

    @Fields.date()
    createdAt = new Date();

    @Fields.number()
    totalAmount = 0;

    @Fields.json()
    items: {
        productId:number;
        productName:string;
        price:number;
        quantity:number;
    }[] = [];

    @Relations.toOne(()=> User, {field: 'userId'})
    user?: User;

}