import type { Order } from "@prisma/client";
import { columnsOrder } from "./columns/order";
import { useTable } from "../hooks/useTable";

export const useOrderTable = (data: Order[]) => {
  return useTable<Order>(data, columnsOrder);
};
