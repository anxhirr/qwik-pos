import type { NoSerialize } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import type { AvailableTables } from "../../../../types";

type Props = {
  table: NoSerialize<AvailableTables>;
};

export const TableFooter = component$<Props>(({ table }) => {
  return (
    <tfoot>
      <tr>
        <td colSpan={99}>
          <div class="flex w-full justify-end">
            <div class="join">
              <button class="btn join-item">«</button>
              <button class="btn join-item">
                Page {(table?.getState().pagination.pageIndex || 0) + 1} of{" "}
                {table?.getPageCount()}
              </button>
              <button
                class="btn join-item"
                onClick$={() => {
                  console.log("table", table?.nextPage);
                  table?.nextPage();
                }}
              >
                »
              </button>
            </div>
          </div>
        </td>
      </tr>
    </tfoot>
  );
});
