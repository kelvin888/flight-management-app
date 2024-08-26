import React, { ReactNode } from "react"
import { CustomTable } from "./CustomTable"
import TableSkeleton from "./TableSkeleton"

interface TableProps {
  data: unknown[]
  columns: unknown[]
  handleRowClick?: (rowId: any) => void
  isLoading?: boolean
  loadingSkeletonCount?: number
  error?: unknown
  emptyState?: ReactNode
}

const Table: React.FC<TableProps> = ({
  isLoading,
  data,
  handleRowClick,
  columns,
  loadingSkeletonCount,
}) => {
  if (isLoading) {
    return <TableSkeleton columns={columns} count={loadingSkeletonCount || 5} />
  }
  if (!data) return <div className="p-3">Unable to retrieve data</div>
  return (
    <div className="overflow-x-auto overflow-y-hidden">
      <CustomTable
        data={data}
        columns={columns}
        handleRowClick={handleRowClick}
      />
    </div>
  )
}

export default Table
