import { remultNextApp } from "remult/remult-next";
import { getUserFromRequest } from "./auth";
import { User } from "../demo/auth/User";
import { Item } from "@/shared/entities/item";
import { store } from "@/shared/entities";
import { Product } from "@/shared/entities/Product";
import { Roles } from "@/demo/auth/Roles";
import { Order } from "@/shared/entities/Order";
import { Category } from "@/shared/entities/Category";

  
export const api = remultNextApp({
  getUser: getUserFromRequest,
  initApi: async () => {
    await User.createDemoUsers();
  },
  entities: [User, Item, Product, Order, Category,...store],
  admin: Roles.admin})
 