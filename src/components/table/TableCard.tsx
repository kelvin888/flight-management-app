import React from "react";

interface TableCardProps {
    data: React.ReactNode[];
    handleRowClick: () => void;
}

export const TableCard = ({ data, handleRowClick }: TableCardProps) => {
    return (
        <div
            className="mb-4 p-4 rounded-lg shadow-lg odd:dark:bg-gray-500 odd:bg-gray-100 bg-white dark:bg-gray-600"
            onClick={handleRowClick}
        >
            {data.map((cellContent, index) => (
                <div key={index} className="mb-2">
                    {cellContent}
                </div>
            ))}
        </div>
    );

} 