import { $, component$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { Button } from "~/components/buttons";
import { DeleteIcon, EditIcon } from "~/components/icons";
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
        Icon: EditIcon,
        id: "edit",
        onClick$: $((id: string) => navigate(`/${entity}/${id}`)),
        tooltipText: "Edit",
      },
      {
        Icon: DeleteIcon,
        id: "delete",
        onClick$: onDelete$,
        tooltipText: "Delete",
      },
    ];

    return (
      <>
        <div class="flex gap-2">
          {ACTION_BUTTONS.map(({ onClick$, id, Icon, tooltipText }) => {
            return (
              <Button
                key={id}
                onClick$={() => onClick$(entityId)}
                variant="secondary"
                Icon={Icon}
                size="sm"
                tooltipText={tooltipText}
              />
            );
          })}
        </div>
      </>
    );
  },
);
