import { Entity, Fields, Relations } from "remult";
import { Category } from "./Category";
import { Material } from "./Material";
import { Size } from "./Size";

@Entity<Product>("product", {
  allowApiCrud: true,
  defaultOrderBy: { name: "asc" },
})
export class Product {
  @Fields.autoIncrement()
  id = 0;

  @Fields.string()
  name!: string;

  @Fields.string()
  description!: string;

  @Fields.string()
  img!: string;

  @Fields.string({ dbName: "category" })
  categoryId = "";

  @Relations.toOne(() => Category, { field: "categoryId" })
  category!: Category;

  @Fields.integer()
  price!: number;

  @Fields.string({ dbName: "material" })
  materialId = "";

  @Relations.toOne(() => Material, { field: "materialId" })
  material!: Material;

  @Relations.toOne(() => Size, { field: "sizeId" })
  size!: Size;
}
