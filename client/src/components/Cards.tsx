import { useState, useEffect } from "react";

import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

import { FiXCircle } from "react-icons/fi";
import { BiCheckDouble, BiUser, BiFile } from "react-icons/bi";

import { useInvoices } from "../store/invoice";
import NumberFormat from "../helpers/numberFormatter";

const Widgets = () => {
  const { data } = useInvoices();
  const [clients, setClients] = useState(0);
  const [invoices, setInvoices] = useState(0);
  const [paid, setPaid] = useState(0);
  const [unpaid, setUnpaid] = useState(0);

  useEffect(() => {
    if (!data || !Array.isArray(data)) return;

    const clients = new Set(data.map((invoice) => invoice.clientName));
    setClients(clients.size);
  }, [data]);

  useEffect(() => {
    if (!data || !Array.isArray(data)) return;

    setInvoices(data.length);
  }, [data]);

  useEffect(() => {
    if (!data || !Array.isArray(data)) return;

    const paidInvoices = data.filter((invoice) => invoice.status === "paid");
    const totalAmount = paidInvoices.reduce(
      (acc, invoice) => acc + invoice.total,
      0
    );

    setPaid(totalAmount);
  }, [data]);

  useEffect(() => {
    if (!data || !Array.isArray(data)) return;

    const unpaidInvoices = data.filter((invoice) => invoice.status !== "paid");
    const totalAmount = unpaidInvoices.reduce(
      (acc, invoice) => acc + invoice.total,
      0
    );

    setUnpaid(totalAmount);
  }, [data]);

  return (
    <div>
      {data ? (
        <div className="flex flex-wrap items-center gap-x-2 gap-y-4 w-full">
          <Card className="border flex-1 w-full md:min-w-[12rem] shadow-none ">
            <div className="flex items-center justify-between">
              <CardHeader>
                <CardTitle>
                  <span className="text-md text-slate-500 font-normal">
                    Clients
                  </span>
                </CardTitle>
                <CardDescription className="">
                  <span className="text-2xl mt-2 text-slate-600 dark:text-slate-200 font-semibold">
                    {clients}
                  </span>
                </CardDescription>
              </CardHeader>
              <div className="w-12 h-12 bg-blue-400/20 rounded-lg mr-6 flex justify-center items-center">
                <BiUser className="text-blue-500 text-2xl" />
              </div>
            </div>
          </Card>
          <Card className="border flex-1 w-full md:min-w-[12rem] shadow-none">
            <div className="flex items-center justify-between">
              <CardHeader>
                <CardTitle>
                  <span className="text-md text-slate-500 font-normal">
                    Invoices
                  </span>
                </CardTitle>
                <CardDescription className="">
                  <span className="text-2xl text-slate-600 mt-2 dark:text-slate-200 font-semibold">
                    {invoices}
                  </span>
                </CardDescription>
              </CardHeader>
              <div className="w-12 h-12 bg-blue-400/20 rounded-lg mr-6 flex justify-center items-center">
                <BiFile className="text-blue-500 text-2xl" />
              </div>
            </div>
          </Card>
          <Card className="border flex-1 w-full md:min-w-[12rem] shadow-none">
            <div className="flex items-center justify-between">
              <CardHeader>
                <CardTitle>
                  <span className="text-md text-slate-500 font-normal">
                    Paid
                  </span>
                </CardTitle>
                <CardDescription>
                  <span className="text-2xl mt-2 text-slate-600 dark:text-slate-200 font-semibold">
                    ${NumberFormat(paid)}
                  </span>
                </CardDescription>
              </CardHeader>
              <div className="w-12 h-12 bg-blue-400/20  rounded-lg mr-6 flex justify-center items-center">
                <BiCheckDouble className="text-blue-500 text-2xl" />
              </div>
            </div>
          </Card>
          <Card className="border flex-1 w-full md:min-w-[12rem]  shadow-none">
            <div className="flex items-center justify-between">
              <CardHeader>
                <CardTitle>
                  <span className="text-md text-slate-500 font-normal">
                    Unpaid
                  </span>
                </CardTitle>
                <CardDescription>
                  <span className="text-2xl text-slate-600 mt-2 dark:text-slate-200 font-semibold">
                    ${NumberFormat(unpaid)}
                  </span>
                </CardDescription>
              </CardHeader>
              <div className="w-12 h-12 bg-blue-400/20 rounded-lg mr-6 flex justify-center items-center">
                <FiXCircle className="text-blue-500 text-2xl" />
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-x-2 gap-y-4 w-full">
          <Skeleton className="flex-1 w-full md:min-w-[12rem] h-24" />
          <Skeleton className="flex-1 w-full md:min-w-[12rem] h-24" />
          <Skeleton className="flex-1 w-full md:min-w-[12rem] h-24" />
          <Skeleton className="flex-1 w-full md:min-w-[12rem] h-24" />
        </div>
      )}
    </div>
  );
};

export default Widgets;
