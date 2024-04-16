import {
  invoiceId,
  openEditInvoiceModal,
  openViewInvoiceModal,
} from "../../store/invoice";
import { useSessionToken, useInvoices } from "../../store/invoice";
import { message } from "antd";
import { Button } from "../ui/button";
import { deleteInvoice } from "../../apicalls/invoice";
import DataTable from "./Table";
import { columns } from "../columns";
import { MoreHorizontal, Trash, Edit, Eye } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const InvoiceComp = ({ invoices }: any) => {
  const { setOpenEditInvoice } = openEditInvoiceModal();
  const { setOpenViewInvoice } = openViewInvoiceModal();

  const { setId } = invoiceId();

  const { sessionToken } = useSessionToken();
  const { fetchData } = useInvoices();

  const deleteInvoiceHandler = async ({
    id,
    userid,
  }: {
    id: string;
    userid: string;
  }) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this invoice?"
    );

    if (!confirm) {
      return;
    }
    try {
      await deleteInvoice({
        _id: id,
        userid: userid,
      });

      message.success("Invoice deleted successfully");
      await fetchData();
    } catch (error) {
      console.log(error);
      message.error("Failed to delete invoice");
    }
  };

  const actionColumn: any = {
    id: "action",
    header: "Action",
    width: "100px",
    cell: ({ row }: any) => {
      const invoice = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="text-slate-500">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                setId(invoice._id);
                setOpenEditInvoice(true);
              }}
            >
              <span className="text-md slate-600 flex items-center gap-x-2 text-slate-500">
                <Edit className="h-4 w-4 " />
                <span className="">Edit</span>
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-slate-500"
              onClick={() => {
                setId("");
                setId(invoice._id);
                setOpenViewInvoice(true);
              }}
            >
              <span className="text-md slate-600 flex items-center gap-x-2">
                <Eye className="h-4 w-4 " />
                <span>View </span>
              </span>
            </DropdownMenuItem>{" "}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={async () => {
                deleteInvoiceHandler({
                  id: invoice._id,
                  userid: sessionToken._id,
                });
                // await fetchInvoices();
              }}
            >
              <span className="text-md text-slate-500 flex items-center gap-x-2">
                <Trash className="h-4 w-4 " />
                <span>Delete</span>
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  };
  return (
    <div>
      <div>
        <div className="">
          <div className="flex flex-col justify-center items-center w-full  ">
            {/* <NewInvoice /> */}
            <div className="w-full my-10">
              <DataTable
                data={invoices}
                columns={columns.concat(actionColumn)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceComp;
