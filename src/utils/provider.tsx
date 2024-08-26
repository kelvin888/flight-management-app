"use client";

import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/api/client/flight";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from 'next-themes'


function Providers({ children }: React.PropsWithChildren): React.JSX.Element {

    return (
        <QueryClientProvider client={queryClient}>
            <ToastContainer />
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                {children}
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default Providers;