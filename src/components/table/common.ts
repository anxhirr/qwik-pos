import type { Order } from "@prisma/client";
import { columnsOrder } from "./columns/order";
import { useTable } from "../hooks/useTable";
import type { PrismaItemWithPrice } from "~/types-and-validation/itemSchema";
import { columnsItems } from "./columns/items";

export const useOrderTable = (data: Order[]) => {
  return useTable<Order>(data, columnsOrder);
};

export const useItemsTable = (data: PrismaItemWithPrice[]) => {
  return useTable<PrismaItemWithPrice>(data, columnsItems);
};
