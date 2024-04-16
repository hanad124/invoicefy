import ReactApexChart from "react-apexcharts";
import { useInvoices } from "../store/invoice";
import { Card } from "./ui/card";

import {
  generateInvoicesSeries,
  generateInvoicesOptions,
} from "./chart.config";

const ApexChart = () => {
  const { data } = useInvoices();

  return (
    <div className="md:min-w-[34rem]">
      <Card className=" shadow-none">
        <div className="py-4">
          {Array.isArray(data) && data.length > 0 ? (
            <ReactApexChart
              options={generateInvoicesOptions()}
              series={generateInvoicesSeries(data)}
              type="bar"
              height={350}
            />
          ) : (
            <div className="flex items-center justify-center h-96">
              <p className="text-gray-400">No data available</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ApexChart;
