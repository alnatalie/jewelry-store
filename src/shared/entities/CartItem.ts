import { Entity, Fields } from "remult";


@Entity('cart_item', {
    allowApiCrud: true

})

export class CartItem {
    @Fields.string()
    id ='';

    @Fields.string()
    name ='';   //Название дублируется для быстрого доступа

    @Fields.integer()
    price! :number; //Цена за еденицу товара на момент добавления

    @Fields.integer()
    quantity = 1; //Количество

    @Fields.date()
    createdAt = new Date(); //Дата добавления



    



}

