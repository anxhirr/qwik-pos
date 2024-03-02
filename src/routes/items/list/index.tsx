import { component$ } from "@builder.io/qwik";
import { routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import { TableBase } from "~/components/table/base";
import { useItemsTable } from "~/components/table/common";
import { getAllItems } from "~/lib/queries/items";
import { prisma } from "~/routes/plugin@auth";
import { getSessionSS } from "~/utils/auth";
import { checkIsIdValid } from "~/utils/route-action";

export const useItemsLoader = routeLoader$(async (event) => {
  const session = getSessionSS(event);
  const items = await getAllItems(session.shopId);

  return items;
});

//TODO: maybe add types?
export const useDeleteItem = routeAction$(async (item, { fail }) => {
  const { id } = item;
  if (!checkIsIdValid(id)) {
    fail(500, {
      message: "id is missing",
    });
    return;
  }

  const result = await prisma.item.delete({ where: { id } });
  console.log("result", result);

  return {
    status: 200,
    message: "Item deleted successfully",
  };
});

export default component$(() => {
  const items = useItemsLoader();
  const deleteItem = useDeleteItem();
  const table = useItemsTable(items);

  return (
    <>
      <TableBase
        entity="ITEM"
        table={table.instance}
        onDelete$={(id) => {
          console.log("onDelete id", id);
        }}
        onDeleteConfirm$={(id) => {
          console.log("onDeleteConfirm id", id);
          deleteItem.submit({ id });
        }}
      />
    </>
  );
});
