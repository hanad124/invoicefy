import NewInvoice from "../components/invoice/NewInvoice";
import { useLayoutEffect } from "react";
import InvoiceComp from "../components/invoice/invoice";
import { useInvoices } from "../store/invoice";

const Invoice = () => {
  const { fetchData, data } = useInvoices();

  useLayoutEffect(() => {
    const fetchDataAndInitialize = async () => {
      await fetchData();
    };

    fetchDataAndInitialize();

    return () => {};
  }, []);

  return (
    <div>
      <NewInvoice />

      <InvoiceComp invoices={data} />
    </div>
  );
};

export default Invoice;
