import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import React from "react"

interface TableProps {
  columns: any[]
  handleRowClick?: (rowId: string | number) => void
}

const data: any[] = []

const TableError = ({ columns }: TableProps) => {

  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table className="w-full">
      <thead className="bg-[#F2F2F2]">
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
        <tr>
          <td
            colSpan={columns?.length}
            className={`h-16 bg-white px-5 text-sm `}
          >
            Unable to fetch data. Kindly reload the page or try again
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default TableError
