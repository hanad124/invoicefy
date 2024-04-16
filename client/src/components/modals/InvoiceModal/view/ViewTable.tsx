import DataTable from "./ViewDataTable";
import { previewColumns } from "../../../columns";
import { Skeleton } from "../../../ui/skeleton";
import ViewTotalBanner from "./ViewTotalBanner";

const ViewTable = ({ items, total }: { items: any; total: any }) => {
  return (
    <div className="mt-16">
      {items?.length > 0 ? (
        <DataTable data={items} columns={previewColumns} />
      ) : (
        <Skeleton className="h-20 w-full" />
      )}
      <div className="flex justify-end mt-10">
        {items?.length > 0 ? (
          <>
            <ViewTotalBanner total={total} />
          </>
        ) : (
          <Skeleton className="h-24 w-[300px]" />
        )}
      </div>
    </div>
  );
};

export default ViewTable;
