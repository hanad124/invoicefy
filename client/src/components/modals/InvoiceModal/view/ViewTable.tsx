import DataTable from "./ViewDataTable";
import { previewColumns } from "../../../columns";
import { Skeleton } from "../../../ui/skeleton";
import ViewTotalBanner from "./ViewTotalBanner";

import { FiPrinter, FiDownload } from "react-icons/fi";

const ViewTable = ({ items, total }: { items: any; total: any }) => {
  return (
    <div className="mt-6">
      {items?.length > 0 ? (
        <DataTable data={items} columns={previewColumns} />
      ) : (
        <Skeleton className="h-20 w-full" />
      )}
      <div className="flex justify-end mt-10">
        {items?.length > 0 ? (
          <>
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center rounded w-fit h-fit overflow-hidden">
                <div className="bg-primary/10 px-2 py-2 cursor-pointer flex items-center gap-2">
                  <FiPrinter className="text-black" />
                  <span>Print</span>
                </div>
                <div className="bg-primary px-2 py-2 cursor-pointer flex items-center gap-2">
                  <FiDownload className="text-white" />
                  <span className="text-white">Download</span>
                </div>
              </div>
              <div className="">
                <ViewTotalBanner total={total} />
              </div>
            </div>
          </>
        ) : (
          <Skeleton className="h-24 w-[300px]" />
        )}
      </div>
    </div>
  );
};

export default ViewTable;
