import { remultNextApp } from "remult/remult-next";
import { getUserFromRequest } from "./auth";
import { User } from "../demo/auth/User";
import { Item } from "@/shared/entities/item";
import { store } from "@/shared/entities";
  
export const api = remultNextApp({
  getUser: getUserFromRequest,
  initApi: async () => {
    await User.createDemoUsers();
  },
  admin: true,
  entities: [User, Item, ...store],
});