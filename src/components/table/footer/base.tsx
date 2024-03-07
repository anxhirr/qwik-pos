import type { NoSerialize } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import type { AvailableTables } from "../../../../types";
import {
  KeyboardArrowLeftIcon,
  KeyboardArrowRightIcon,
} from "~/components/icons";
import { Select } from "~/components/shared";
import { PAGE_SIZES } from "~/constants/enum";

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
              <button
                class="btn join-item"
                onClick$={() => {
                  if (!table?.getCanPreviousPage()) return;
                  table.previousPage();
                }}
              >
                <KeyboardArrowLeftIcon />
              </button>
              <button class="btn join-item">
                Page {(table?.getState().pagination.pageIndex || 0) + 1} of{" "}
                {table?.getPageCount()}
              </button>
              <button
                class="btn join-item"
                onClick$={() => {
                  if (!table?.getCanNextPage()) return;

                  table.nextPage();
                }}
              >
                <KeyboardArrowRightIcon />
              </button>
            </div>

            <Select
              options={PAGE_SIZES.map((size) => ({
                label: `${size} per page`,
                value: size,
              }))}
              placeholder="Page Size"
              name="pageSize"
              value={table?.getState().pagination.pageSize}
              onChange$={(e) => {
                table?.setPageSize(Number(e.target.value));
              }}
            />
          </div>
        </td>
      </tr>
    </tfoot>
  );
});
