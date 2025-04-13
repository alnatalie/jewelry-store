import { Entity, Fields } from "remult";


@Entity<Buyer>('buyer', {
    allowApiCrud: true,
  defaultOrderBy: { name: "asc" },

})

export class Buyer {
    @Fields.autoIncrement()
    id =0

    @Fields.string()
    name!: string

    @Fields.string()
    email!: string

    @Fields.string()
    phone!: string

    @Fields.string()
    sity!: string

    @Fields.string()
    address!: string

}