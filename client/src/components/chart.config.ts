import { ApexOptions } from "apexcharts";
import { TInvoice } from "../types/invoice";

export const generateInvoicesSeries = (data: TInvoice | TInvoice[]): any => {
  if (Array.isArray(data)) {
    const paid = data.filter((invoice) => invoice.status === "paid");
    const pending = data.filter((invoice) => invoice.status === "pending");
    const cancelled = data.filter((invoice) => invoice.status === "cancelled");
    return [
      {
        name: "Paid",
        data: paid.map((invoice) => invoice?.total),
      },
      {
        name: "Pending",
        data: pending.map((invoice) => invoice?.total),
      },
      {
        name: "Cancelled",
        data: cancelled.map((invoice) => invoice?.total),
      },
    ];
  } else {
    return;
  }
};

export const generateInvoicesOptions = () => {
  return {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    colors: ["#475BE8", "#CFC8FF", "#eb4034"],
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        columnWidth: "55%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
    },
    stroke: {
      colors: ["transparent"],
      width: 4,
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    },
    yaxis: {
      title: {
        text: "$ (thousands)",
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
    tooltip: {
      y: {
        formatter(val) {
          return `$ ${val} ${val > 1 ? "thousands" : "thousand"}`;
        },
      },
      x: {
        formatter(val) {
          return `${val} invoices`;
        },
      },
    },
  } as ApexOptions;
};
