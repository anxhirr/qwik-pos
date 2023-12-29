import { $, component$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { IcRoundDelete, IcRoundModeEdit } from "~/components/icons";
type Props = {
  entity: "items" | "categories";
  entityId: string;
  onDelete$: (entityId: string) => void;
};

export const TableRowActions = component$<Props>(
  ({ entity = "items", entityId, onDelete$ }) => {
    const navigate = useNavigate();

    const ACTION_BUTTONS = [
      {
        Icon: IcRoundModeEdit,
        id: "edit",
        onClick$: $((id: string) => navigate(`/${entity}/${id}`)),
      },
      {
        Icon: IcRoundDelete,
        id: "delete",
        onClick$: onDelete$,
      },
    ];

    return (
      <>
        <div class="flex gap-2">
          {ACTION_BUTTONS.map(({ Icon, onClick$, id }) => {
            // const data = row.original;
            return (
              <button
                key={id}
                class="btn btn-neutral btn-sm"
                onClick$={() => onClick$(entityId)}
              >
                {<Icon />}
              </button>
            );
          })}
        </div>
      </>
    );
  },
);
