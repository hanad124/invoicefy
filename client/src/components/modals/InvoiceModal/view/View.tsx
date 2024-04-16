import { Dialog, DialogContent } from "../../../ui/dialog";
import { openViewInvoiceModal } from "../../../../store/invoice";
import { useEffect } from "react";
import logo from "../../../../../public/logo.svg";
import qrcode from "../../../../../public/qrcode.svg";
import getShortId from "../../../../helpers/getShortId";
import {
  useInvoices,
  invoiceId,
  useInvoiceById,
} from "../../../../store/invoice";
import { Skeleton } from "../../../ui/skeleton";
import ViewTable from "./ViewTable";
import StatusBadge from "./StatusBadge";

const ViewInvoiceModel = () => {
  const { setOpenViewInvoice, openViewInvoice } = openViewInvoiceModal();
  const { id } = invoiceId();
  const { data, fetchInvoice } = useInvoiceById();
  const { fetchData } = useInvoices();

  useEffect(() => {
    if (id) {
      fetchInvoice(id);

      return () => {
        fetchData();
      };
    }
  }, [openViewInvoice, id]);

  return (
    <>
      <Dialog
        open={openViewInvoice}
        onOpenChange={(openViewInvoice) => {
          setOpenViewInvoice(openViewInvoice);

          if (!openViewInvoice) {
            fetchData();
          }
        }}
      >
        <DialogContent className="sm:max-w-fit md:min-w-[45rem] max-h-screen overflow-y-scroll">
          <div className="flex items-center justify-between mt-6">
            <div className="">
              <div className="flex items-center gap-3">
                <img src={logo} alt="logo" className="w-[3rem] h-[3rem]" />
                <h1 className="text-3xl font-bold text-primary tracking-wider">
                  InvoiceFy
                </h1>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <img src={qrcode} alt="qrcode" className="w-[6rem] h-[6rem] " />
                <div className=" py-4 rounded h-fit px-4">
                  <StatusBadge />
                </div>
              </div>
            </div>
            <div className="">
              <h1 className="text-2xl text-right font-semibold uppercase tracking-wider mt-1">
                INVOICE
              </h1>
              {data ? (
                <div className="flex flex-col gap-y-2 mt-10">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">Bill To:</span>
                    <h1 className="text-left">{data.clientName}</h1>
                  </div>{" "}
                  <div className="flex items-center gap-3">
                    <span className="font-medium">Invoice Number:</span>
                    <h1 className="">
                      #{getShortId(data?._id! || "00000000")}
                    </h1>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium">Invoice Date:</span>
                    <h1 className="">
                      {data.invoiceDate?.toString().slice(0, 10)}
                    </h1>
                  </div>
                </div>
              ) : (
                <>
                  <Skeleton className="w-40 h-8 mt-10" />
                </>
              )}
            </div>
          </div>
          <div className="py-2">
            <ViewTable items={data?.items} total={data.total} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewInvoiceModel;
