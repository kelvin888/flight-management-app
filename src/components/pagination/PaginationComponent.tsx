"use client"
import React from "react"
import ReactPaginate from "react-paginate"
import "./pagination.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBackward, faForward } from "@fortawesome/free-solid-svg-icons"

export type PaginationProps = {
  currentPage: number
  pageSize: number
  totalPages: number
  totalElements: number
  handlePageChange: (page: { selected: number }) => void
}

export const Pagination: React.FC<{
  pagination: PaginationProps
}> = ({ pagination }) => {

  const { currentPage, totalPages, handlePageChange } = pagination

  return (
    <div className="... flex justify-end">
      <ReactPaginate
        forcePage={currentPage}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName="paginate"
        disabledClassName={"paginate__link--disabled"}
        activeClassName={"paginate__link--active"}
        nextLinkClassName="bg-none"
        previousLinkClassName="bg-none"
        previousLabel={<FontAwesomeIcon icon={faBackward} />}
        nextLabel={<FontAwesomeIcon icon={faForward} />}
      />
    </div>
  )
}
