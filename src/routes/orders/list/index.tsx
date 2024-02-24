import { component$ } from "@builder.io/qwik";
import { routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import { TableBase } from "~/components/table/base";
import { useOrderTable } from "~/components/table/common";
import { getAllOrders } from "~/lib/queries/orders";
import { prisma } from "~/routes/plugin@auth";
import { getSessionSS } from "~/utils/auth";

export const useLoader = routeLoader$(async (event) => {
  const session = getSessionSS(event);
  const data = await getAllOrders(session.shopId);

  return data;
});

//TODO: maybe add types?
export const useDeleteAction = routeAction$(async (data, { fail }) => {
  const { id } = data;
  if (!id || typeof id !== "string") {
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
  const table = useOrderTable(data.value);

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
        }}
      />
      <div class="join">
        <button class="btn join-item">«</button>
        <button class="btn join-item">
          Page {(table.instance?.getState().pagination.pageIndex || 0) + 1} of{" "}
          {table.instance?.getPageCount()}
        </button>
        <button
          class="btn join-item"
          // onClick$={() => console.log("table", table.instance?.nextPage())}
          onClick$={() => {
            console.log("table", table.instance?.nextPage);
            table.instance?.nextPage();
          }}
        >
          »
        </button>
        <pre>
          {JSON.stringify(table.instance?.getState().pagination, null, 2)}
        </pre>
      </div>
    </>
  );
});
