import { component$ } from "@builder.io/qwik";
import { routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import { TableBase } from "~/components/table/base";
import { useOrderTable } from "~/components/table/common";
import { getAllOrders } from "~/lib/queries/orders";
import { useToastsContext } from "~/routes/layout";
import { prisma } from "~/routes/plugin@auth";
import { getSessionSS } from "~/utils/auth";
import { checkIsIdValid } from "~/utils/route-action";

export const useLoader = routeLoader$(async (event) => {
  const session = getSessionSS(event);
  const data = await getAllOrders(session.shopId);

  return data;
});

//TODO: maybe add types?
export const useDeleteAction = routeAction$(async (data, { fail }) => {
  const { id } = data;
  if (!checkIsIdValid(id)) {
    fail(500, {
      message: "id is missing",
    });
    return;
  }

  const result = await prisma.order.delete({ where: { id } });
  console.log("result", result);

  return {
    status: 200,
    message: "Item deleted successfully",
  };
});

export default component$(() => {
  const data = useLoader();
  const deleteOrder = useDeleteAction();
  const table = useOrderTable(data);

  const toastsStore = useToastsContext();

  return (
    <>
      <TableBase
        table={table.instance}
        entity="ORDER"
        onDelete$={(id) => {
          console.log("id", id);
        }}
        onDeleteConfirm$={(id) => {
          console.log("id", id);
          deleteOrder.submit({ id });

          toastsStore.toasts.push({
            id: "1",
            message: "Order deleted successfully",
            type: "success",
          });
        }}
      />
    </>
  );
});
