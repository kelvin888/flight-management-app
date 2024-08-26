"use client"
import { FC } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/button';

const BadRequestPage: FC = () => {
    const router = useRouter();

    const handleGoBack = () => {
        router.push("/");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 bg-gray-100 dark:bg-gray-400">
            <div className="max-w-md w-full text-center bg-white dark:bg-gray-300 shadow-lg rounded-lg p-6">
                <h1 className="text-4xl font-bold text-red-600 mb-4">Bad Request</h1>
                <p className="text-lg mb-4 dark:text-gray-800">
                    It looks like the request you made contains invalid parameters. Please check the URL and try again.
                </p>
                <Button variant="primary" onClick={handleGoBack}>
                    Go Back
                </Button>
            </div>
        </div>
    );
};

export default BadRequestPage;
