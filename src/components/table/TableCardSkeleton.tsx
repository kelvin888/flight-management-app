import React from 'react'
import Skeleton from 'react-loading-skeleton'

interface TableCardSkeletonProps {
    count: number;
}

export const TableCardSkeleton = ({ count }: TableCardSkeletonProps) => {
    return (
        <>
            {Array(count).fill("").map((_, index) => (
                <div key={index} className="p-4 mb-4 bg-white rounded shadow-md dark:bg-gray-500">
                    <Skeleton width={`60%`} height={`1.25rem`} />
                    <div className="mt-2">
                        <Skeleton width={`100%`} height={`1rem`} />
                        <Skeleton width={`100%`} height={`1rem`} />
                        <Skeleton width={`100%`} height={`1rem`} />
                    </div>
                </div>
            ))}
        </>
    )
}
