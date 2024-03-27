import type { Order } from "@prisma/client";
import { useTable } from "../hooks/useTable";
import type { TableHookData } from "~/types";
import type { PrismaItemWithPrice } from "~/validation/itemSchema";
import { columnsItems, columnsOrder } from "./columns";

export const useOrderTable = (data: TableHookData<Order>) => {
  return useTable<Order>(data, columnsOrder);
};

export const useItemsTable = (data: TableHookData<PrismaItemWithPrice>) => {
  return useTable<PrismaItemWithPrice>(data, columnsItems);
};
