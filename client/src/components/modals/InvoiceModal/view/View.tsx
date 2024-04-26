import { Dialog, DialogContent } from "../../../ui/dialog";
import {
  openViewInvoiceModal,
  useSessionToken,
} from "../../../../store/invoice";
import { useEffect } from "react";
import logo from "../../../../../public/logo.svg";
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
  const { sessionToken } = useSessionToken();

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
        <DialogContent className="sm:max-w-fit md:min-w-[50rem] max-h-screen overflow-y-scroll border-none outline-none">
          <div className="mt-6">
            <div className="flex justify-between pb-8 border-b">
              <div className="">
                {data ? (
                  <div className="flex flex-col gap-y-2">
                    <div className="flex items-center gap-3">
                      <span className="font-bold">Bill To:</span>
                      <h1 className="text-left capitalize">
                        {data.clientName}
                      </h1>
                    </div>{" "}
                    <div className="flex items-center gap-3">
                      <span className="font-bold">Invoice Number:</span>
                      <h1 className="uppercase">
                        #{getShortId(data?._id! || "00000000")}
                      </h1>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold">Invoice Date:</span>
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
              <div className="">
                <div className="flex items-center gap-3">
                  <img
                    src={sessionToken?.companyLogo}
                    alt="logo"
                    className="w-[3rem] h-[3rem]"
                  />
                  <h1 className="text-3xl font-bold text-primary tracking-wider">
                    InvoiceFy
                  </h1>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <StatusBadge />
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
