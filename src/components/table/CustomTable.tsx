"use client";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { TableCard } from "./TableCard";

interface CustomTableProps {
  data: any[];
  columns: any[];
  handleRowClick?: (rowId: string | number) => void;
}

export const CustomTable = ({ columns, data, handleRowClick }: CustomTableProps) => {
  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const isSmallScreen = useMediaQuery({ maxWidth: 640 });

  return (
    <>
      {isSmallScreen ? (
        <div className="p-4">
          {table.getRowModel().rows.map((row) => (
            <TableCard
              key={row.id}
              data={row.getVisibleCells().map(cell => flexRender(cell.column.columnDef.cell, cell.getContext()))}
              handleRowClick={() => handleRowClick && handleRowClick(row.original)}
            />
          ))}
        </div>
      ) : (
        <table className="w-full">
          <thead className="bg-[#F2F2F2] dark:bg-gray-600">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    className="h-12 px-5 text-sm font-semibold first-of-type:rounded-tl last-of-type:rounded-tr"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {data.length > 0 ? (
            <tbody>
              {table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  onClick={() => handleRowClick && handleRowClick(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      className={`h-16 px-5 text-sm ${index % 2 === 0 ? "bg-[#F9FAFB] dark:bg-gray-400" : "bg-white dark:bg-gray-600"
                        }`}
                      key={cell.id}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td
                  colSpan={table.getHeaderGroups()?.length || columns.length}
                  className="h-16 px-5 text-sm"
                >
                  No records found
                </td>
              </tr>
            </tbody>
          )}
        </table>
      )}
    </>
  );
};
