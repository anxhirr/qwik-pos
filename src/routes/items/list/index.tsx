import { $, component$, useSignal } from "@builder.io/qwik";
import { routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import { ItemsListBottomNav } from "~/components/bottom-nav";
import { DeleteEntityConfirmDialog } from "~/components/dialogs/shared/DeleteEntityConfirmDialog";
import { TableBase } from "~/components/table/base";
import { useItemsTable } from "~/components/table/common";
import { getAllItems } from "~/lib/queries/items";
import { prisma } from "~/routes/plugin@auth";
import { getSessionSS } from "~/utils/auth";
import { checkIsIdValid, checkIsIdsValid } from "~/utils/route-action";

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

export const useBulkDeleteItem = routeAction$(async (ids, { fail }) => {
  if (!checkIsIdsValid(ids)) {
    fail(500, {
      message: "ids are missing",
    });
    return;
  }

  const result = await prisma.item.deleteMany({ where: { id: { in: ids } } });
  console.log("result", result);

  return {
    status: 200,
    message: "Items deleted successfully",
  };
});

export default component$(() => {
  const items = useItemsLoader();
  const deleteItem = useDeleteItem();
  const bulkDeleteItem = useBulkDeleteItem();
  const table = useItemsTable(items);
  const showConfirmDialog = useSignal(false);

  return (
    <>
      <div class="main-content">
        <TableBase
          entity="ITEM"
          table={table.instance}
          onDelete$={(id) => {
            console.log("onDelete id", id);
          }}
          onDeleteConfirm$={(id) => {
            deleteItem.submit({ id });
          }}
        />
      </div>

      <ItemsListBottomNav
        onDeleteClick$={() => {
          showConfirmDialog.value = true;
        }}
        showDeleteBtn={
          table.instance?.getIsAllRowsSelected() ||
          table.instance?.getIsSomeRowsSelected()
        }
      />

      <DeleteEntityConfirmDialog
        entity={"ITEM"}
        show={showConfirmDialog}
        hide={$(() => {
          showConfirmDialog.value = false;
        })}
        onCancel$={() => {
          showConfirmDialog.value = false;
        }}
        isBulk
        onConfirm$={() => {
          showConfirmDialog.value = false;
          const selected = table.instance?.getSelectedRowModel();
          const original = selected?.rows.map((row) => row.original);
          const ids = original?.map((item) => item.id);
          bulkDeleteItem.submit(ids);
        }}
      />
    </>
  );
});
