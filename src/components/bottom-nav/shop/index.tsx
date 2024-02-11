import type {
  IntrinsicHTMLElements,
  JSXNode,
  QwikMouseEvent,
} from "@builder.io/qwik";
import { $, component$ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import type { FormStore, ResponseData } from "@modular-forms/qwik";
import { IcBaselineCheckCircle } from "~/components/icons";
import { SHOP_FORM_ID } from "~/constants/enum";
import type { ShopFormType } from "~/types-and-validation/shopSchema";
import type { IconProps } from "../../../../types";

type Props = {
  form?: FormStore<ShopFormType, ResponseData>;
};

type BtnProps = {
  text: string;
  Icon: (props: IconProps) => JSXNode;
  submittingText?: string;
  type?: IntrinsicHTMLElements["button"]["type"];
  onClick$?: (
    event: QwikMouseEvent<HTMLButtonElement, MouseEvent>,
    element: HTMLButtonElement,
  ) => any;
};

type BtnMap = Map<string, BtnProps[]>;

export const ShopActionBar = component$<Props>(({ form }) => {
  const location = useLocation();
  const nav = useNavigate();

  const BTNS: BtnMap = new Map([
    [
      "/settings/shop/",
      [
        {
          text: "Update",
          submittingText: "Updating...",
          Icon: IcBaselineCheckCircle,
          type: "submit",
        },
        {
          text: "Create New",
          Icon: IcBaselineCheckCircle,
          type: "button",
          onClick$: $(() => nav("/settings/shop/new/")),
        },
      ],
    ],
    [
      "/settings/shop/new/",
      [
        {
          text: "Create",
          submittingText: "Creating...",
          Icon: IcBaselineCheckCircle,
          type: "submit",
        },
      ],
    ],
  ]);

  const matchBtns = BTNS.get(location.url.pathname) || [];

  return (
    <div class="navbar fixed bottom-0 right-0 bg-base-100">
      <div class="navbar-start"></div>
      <div class="navbar-center"></div>
      <div class="navbar-end">
        <div class="flex gap-3">
          {matchBtns.map(({ text, submittingText, Icon, ...rest }) => (
            <button
              key={text}
              form={SHOP_FORM_ID}
              disabled={form?.submitting}
              class="btn btn-success"
              {...rest}
            >
              <Icon />
              {form?.submitting ? submittingText : text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});
