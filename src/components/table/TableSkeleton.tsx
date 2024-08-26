import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import React from "react"
import Skeleton from "react-loading-skeleton"
import { useMediaQuery } from 'react-responsive'
import { TableCardSkeleton } from './TableCardSkeleton'

interface TableProps {
  columns: any[]
  count: number
  handleRowClick?: (rowId: string | number) => void
}

const data: any[] = []

const TableSkeleton = ({ columns, count }: TableProps) => {

  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const isSmallScreen = useMediaQuery({ maxWidth: 640 });

  return (
    <>
      {isSmallScreen ? (
        <div className="p-4">
          <TableCardSkeleton count={count} />
        </div>
      ) : (
        <table className="w-full">
          <thead className="bg-[#F2F2F2] dark:bg-gray-600">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <td
                    className="h-[2.875rem] px-5 text-sm font-semibold"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </td>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {Array(count).fill("").map((item, index) => (
              <tr key={`skeleton-${index}`}>
                {Array(columns?.length).fill("").map((_item, colIndex) => (
                  <td
                    className={`h-16 text-sm ${index % 2 === 0
                      ? "bg-[#F9FAFB] dark:bg-gray-700"
                      : "bg-white dark:bg-gray-400"
                      }`}
                    key={`column-${colIndex}`}
                  >
                    <Skeleton className="py-2 !rounded-none" />
                  </td>
                ))}
              </tr>
            ))}

          </tbody>
        </table>
      )}
    </>
  )
}

export default TableSkeleton
