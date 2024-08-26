import { render, act } from '@testing-library/react';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const AllTheProviders = ({ children }: { children: ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

const customRender = (ui: React.ReactElement, options = {}) => {
    let result;

    act(() => {
        result = render(ui, { wrapper: AllTheProviders, ...options });
    });

    return result;
};

export * from '@testing-library/react';
export { customRender as render };
