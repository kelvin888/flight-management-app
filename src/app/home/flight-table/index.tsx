import React, { FC } from 'react'
import Table from '../../../components/table'
import { flightColumns } from './columns'
import Container from '@/components/container'
import PaginationInfo from '@/components/pagination/PaginationInfo'
import { Pagination } from '@/components/pagination/PaginationComponent'
import Button from '@/components/button'
import AddFlightModal from '../add-flight'
import { useFlights } from '@/hooks/useFlights'
import { useFlightStore } from '@/store/flight'
import { flightKeys } from '@/constants/queryKeys'
import { useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { useUrlParams } from '@/hooks/useUrlParams'

const FlightTable: FC = () => {
    const searchParams = useSearchParams();
    const { updateSearchParam } = useUrlParams();

    const { flights, size, page, total, pages, handlePageChange, handlePageSizeChange, loading } = useFlights({ targetOperations: [flightKeys.GET_FLIGHTS] })

    const { openAddFlightModal, closeAddFlightModal, isAddFlightModalOpen } = useFlightStore(state => state);

    const handleSearch = useDebouncedCallback((searchTerm) => {
        updateSearchParam("code", searchTerm)
    }, 1000);


    return (
        <Container className='px-3 lg:px-0'>
            <div className='-mt-20 pb-24 relative'>

                <div className="mb-2 flex justify-between items-center">
                    <input
                        type='text'
                        name='search'
                        className='h-[2rem] px-2 placeholder:text-xs dark:bg-gray-600 dark:text-white dark:ring-white dark:ring-1'
                        onChange={(e) => {
                            handleSearch(e.target.value);
                        }} placeholder='Search by code'
                        defaultValue={searchParams.get('code')?.toString()}
                    />
                    <Button variant='primary' onClick={openAddFlightModal}>+ Add New Flight</Button>
                </div>

                <Table
                    columns={flightColumns}
                    data={flights || []}
                    isLoading={loading}
                />

                {flights && flights.length > 0 &&
                    <div className='flex justify-between items-center mt-6'>
                        <PaginationInfo
                            pagination={{
                                currentPage: page,
                                pageSize: size,
                                totalPages: pages,
                                totalElements: total
                            }}
                        />

                        <div className='flex items-center gap-2'>
                            <span className='text-xs min-w-fit'>Rows <span className='hidden md:inline-block'>per page</span></span>
                            <select
                                name="pageSize"
                                defaultValue={size}
                                onChange={(e) => handlePageSizeChange({ newSize: e.target.value })}
                                className='text-neutral-400 border border-gray-600 rounded'
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                            </select>
                        </div>


                        <Pagination
                            pagination={{
                                currentPage: page,
                                pageSize: size,
                                totalPages: pages,
                                totalElements: total, handlePageChange
                            }}
                        />
                    </div>
                }
            </div>

            {isAddFlightModalOpen ? <AddFlightModal isOpen={isAddFlightModalOpen} onClose={closeAddFlightModal} /> : null}

        </Container>
    )
}

export default FlightTable