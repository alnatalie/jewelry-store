import { Entity, Fields, Relations } from "remult";
import { Product } from "./Product";


@Entity<Material>('material', {
    allowApiCrud: true,
    defaultOrderBy: { name: "asc" },

})

export class Material {
    @Fields.autoIncrement()
    id =0

    @Fields.string()
    name!: string

    @Relations.toMany(()=> Product)
    Product?: Product[]

}