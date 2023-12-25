import { component$ } from "@builder.io/qwik";
import { ORDER_RECEIPT_DIALOG_ID } from "~/constants/enum";
import { Dialog, DialogBody } from ".";
import type { DialogProps } from "../../../types";

export const ReceiptDialog = component$<DialogProps>(({ show, hide }) => {
  return (
    <Dialog
      id={ORDER_RECEIPT_DIALOG_ID}
      show={show.value}
      hide={hide}
      title="Receipt"
    >
      <DialogBody>
        <div class="print">
          <div class="text-center">
            <h1 class="text-2xl font-bold">Sales Tax Invoice</h1>
            <p>Rruga Ali Demi, Tirane</p>
          </div>
          <div class="border-b-2 border-dashed  py-2">
            <div class="flex justify-between">
              <p>TIN</p>
              <p>123456789</p>
            </div>
            <div class="flex justify-between">
              <p>Date/Time</p>
              <p>date</p>
            </div>
            <div class="flex justify-between">
              <p>Receipt No.</p>
              <p>docNo</p>
            </div>
            <div class="flex justify-between">
              <p>Customer Name</p>
              <p>John Doe</p>
            </div>
            <div class="flex justify-between">
              <p>Business Unit</p>
              <p>Fashion</p>
            </div>
            <div class="flex justify-between">
              <p>Payment Method</p>
              <p>paymentMethod</p>
            </div>
          </div>

          <div>
            items
            {/* {orderModel.getDetailedItems().map((item, i) => {
          const { quantity, total, finalPrice, name, unit } = item
          return (
            <div key={i} class='border-b-2 border-dashed'>
              <div>{name}</div>
              <div class='flex justify-between'>
                <div>
                  {quantity} {unit} x {finalPrice}
                </div>
                <div>{total} Lek</div>
              </div>
            </div>
          )
        })} */}
          </div>

          <div class="border-b-2 border-dashed  py-2">
            <div class="flex justify-between">
              <h2 class="text-xl font-bold">Total</h2>
              <div>total currency</div>
            </div>
            <div class="flex justify-between">
              <h2>Payment amount</h2>
              <div>paymentAmount currency</div>
            </div>
          </div>

          <div class="border-b-2 border-dashed  py-2">
            <div class="flex justify-between">
              <p>No Tax itemsTaxPercentagetoFixed%</p>
              <div>itemsTotalNoTax Lek</div>
            </div>
            <div class="flex justify-between">
              <h2>Tax (itemsTaxPercentagetoFixed%)</h2>
              <div>itemsTaxAmount Lek</div>
            </div>
          </div>

          <div>
            <div>
              {/* <Image
              src="https://firebasestorage.googleapis.com/v0/b/my-pos-9f542.appspot.com/o/QR_code_for_mobile_English_Wikipedia.svg?alt=media&token=a6984d84-cfee-42e2-881b-788542548f49"
              width={200}
              height={200}
              alt="QR Code"
              class="mx-auto"
            /> */}
            </div>

            <div class="text-center">
              Generated by: <span>Qwik-Pos</span>
            </div>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
});
