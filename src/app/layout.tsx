import type { Metadata } from "next";
import Providers from "@/utils/provider";
import { Inter } from "next/font/google"; import Footer from "@/components/footer";
import Header from "@/components/header";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import "react-loading-skeleton/dist/skeleton.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flight management App",
  description: "Create and manage flights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`bg-white dark:bg-gray-700 relative min-h-screen ${inter.className}`}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
