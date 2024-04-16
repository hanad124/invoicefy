"use client";

import { openNewInvoiceModal } from "../../store/model";
import { Button } from "../ui/button";
import { FiPlus } from "react-icons/fi";
import AddInvoiceModel from "../modals/InvoiceModal/AddInvoiceModel";
import EditInvoiceModel from "../modals/InvoiceModal/EditInvoiceModel";
import ViewInvoiceModel from "../modals/InvoiceModal/view/View";

const NewInvoice = () => {
  const { setOpen } = openNewInvoiceModal();

  return (
    <>
      <div className="flex items-center justify-between w-full ">
        <h1 className="text-2xl font-semibold text-slate-900">Invoices</h1>
        <Button
          className="flex items-center gap-2 p-2 py-4"
          variant="default"
          color="primary"
          // size={"lg"}
          onClick={() => {
            setOpen(true);
          }}
        >
          <FiPlus className="text-lg" />
          <span>New Invoice</span>
        </Button>
      </div>
      <AddInvoiceModel />
      <EditInvoiceModel />
      <ViewInvoiceModel />
    </>
  );
};

export default NewInvoice;
