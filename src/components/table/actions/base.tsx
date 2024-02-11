import { $, component$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { Button } from "~/components/buttons";
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
        text: "Edit",
        id: "edit",
        onClick$: $((id: string) => navigate(`/${entity}/${id}`)),
      },
      {
        Icon: IcRoundDelete,
        text: "Delete",
        id: "delete",
        onClick$: onDelete$,
      },
    ];

    return (
      <>
        <div class="flex gap-2">
          {ACTION_BUTTONS.map(({ onClick$, id, text }) => {
            return (
              <Button
                key={id}
                onClick$={() => onClick$(entityId)}
                text={text}
              />
            );
          })}
        </div>
      </>
    );
  },
);
