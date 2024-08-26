import { render, screen, waitFor } from "@/utils/test-utils";
import FlightTable from "@/app/page";
import { useFlights } from "@/hooks/useFlights";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';

jest.mock('@/hooks/useFlights', () => ({
    useFlights: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    useSearchParams: jest.fn(() => ({
        get: jest.fn((param) => {
            if (param === 'size') return '10';
            if (param === 'page') return '0';
            if (param === 'code') return 'FLABAC';
            return null;
        }),
        set: jest.fn(),
    })),
    usePathname: jest.fn(() => '/mock-path'),
}));

jest.mock('@/store/auth', () => ({
    useAuthStore: jest.fn(() => ({
        authenticatedUser: { name: 'John Doe' },
        setAuthUser: jest.fn(),
    })),
}));

const queryClient = new QueryClient();

describe('FlightTable Component', () => {
    it('should render the flight table with mocked data', async () => {
        (useFlights as jest.Mock).mockReturnValue({
            flights: [
                { id: '1', code: 'FLABAC', capacity: 150, departureDate: '2024-07-25' },
                { id: '2', code: 'FLABAF', capacity: 200, departureDate: '2024-07-27' },
            ],
            pages: 1,
        });

        const pushMock = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({
            push: pushMock,
        });

        render(
            <QueryClientProvider client={queryClient}>
                <FlightTable />
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('FLABAC')).toBeInTheDocument();
            expect(screen.getByText('FLABAF')).toBeInTheDocument();
            expect(screen.getByText('150')).toBeInTheDocument();
            expect(screen.getByText('200')).toBeInTheDocument();
        });
    });
});
