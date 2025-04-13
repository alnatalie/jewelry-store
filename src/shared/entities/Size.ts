import { Entity, Fields, Relations } from "remult";
import { Product } from "./Product";


@Entity<Size>('size', {
    allowApiCrud: true,
    defaultOrderBy: { value: "asc" },

})

export class Size {
    @Fields.autoIncrement()
    id =0

    @Fields.string()
    value!: string

    @Relations.toMany(()=> Product)
    Product?: Product[]

}