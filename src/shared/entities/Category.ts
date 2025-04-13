import { Entity, Fields, Relations } from "remult";
import { Product } from "./Product";


@Entity<Category>('category', {
    allowApiCrud: true,
    defaultOrderBy: { name: "asc" },

})

export class Category {
    @Fields.autoIncrement()
    id =0

    @Fields.string()
    name!: string

    @Relations.toMany(()=> Product)
    Product?: Product[]

}