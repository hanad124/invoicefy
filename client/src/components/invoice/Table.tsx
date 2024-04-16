"use client";

import { useState } from "react";

import {
  ColumnDef,
  flexRender,
  SortingState,
  VisibilityState,
  ColumnFiltersState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { FiSearch } from "react-icons/fi";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
// import EditInvoiceModel from "./EditInvoiceModel";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const DataTable = <TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col md:flex-row md:items-center">
          <div
            className="flex items-center px-2 rounded-md md:min-w-[20rem] border focus-within:border-blue-500
          focus-within:border-1"
          >
            <FiSearch className="text-slate-300 stroke-slate-500" />
            <Input
              placeholder="Search by name..."
              value={
                (table.getColumn("clientName")?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                table
                  .getColumn("clientName")
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-md border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-none shadow-transparent focus-visible:ring-opacity-0"
            />
          </div>

          {/*Filter By data using data picker */}
          <div className="flex items-center py-4 md:ml-5">
            <Input
              type="date"
              value={
                (table.getColumn("invoiceDate")?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                table
                  .getColumn("invoiceDate")
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-md"
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-6 md:flex-row">
          {/* filter by status */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="mr-5">
                Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                className="cursor-pointer"
                checked={table.getColumn("status")?.getFilterValue() === ""}
                onCheckedChange={(value) =>
                  table
                    .getColumn("status")
                    ?.setFilterValue(value ? "" : undefined)
                }
              >
                All
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                className="cursor-pointer"
                checked={table.getColumn("status")?.getFilterValue() === "paid"}
                onCheckedChange={(value) =>
                  table
                    .getColumn("status")
                    ?.setFilterValue(value ? "paid" : undefined)
                }
              >
                Paid
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                className="cursor-pointer"
                checked={
                  table.getColumn("status")?.getFilterValue() === "pending"
                }
                onCheckedChange={(value) =>
                  table
                    .getColumn("status")
                    ?.setFilterValue(value ? "pending" : undefined)
                }
              >
                Pending
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                className="cursor-pointer"
                checked={
                  table.getColumn("status")?.getFilterValue() === "draft"
                }
                onCheckedChange={(value) =>
                  table
                    .getColumn("status")
                    ?.setFilterValue(value ? "draft" : undefined)
                }
              >
                Draft
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        {data && data.length > 0 ? (
          <Table>
            <TableHeader>
              {table?.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="cursor-pointer">
              {table?.getRowModel().rows?.length ? (
                table?.getRowModel().rows.map((row) => {
                  return (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        ) : (
          <div className="p-4 text-center">No results.</div>
        )}
      </div>

      {/* Pagination */}
      {data && data.length > 0 && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table?.previousPage()}
            disabled={!table?.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      )}
      {/* <EditInvoiceModel /> */}
    </>
  );
};

export default DataTable;
