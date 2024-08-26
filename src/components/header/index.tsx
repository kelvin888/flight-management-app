"use client";
import React, { useEffect, useState } from "react";
import Container from "../container";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";
import Link from "next/link";
import ThemeSwitch from "../theme-switcher";
import { useAuthStore } from "@/store/auth";
import ProfileDropdown from "./ProfileDropdown";

const Header = () => {
    const { authenticatedUser } = useAuthStore();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className="px-10 h-20 flex items-center border-b sticky top-0 z-10 bg-white dark:bg-gray-600">
            <Container className="flex items-center justify-between">
                <Link href="/">
                    <div className="flex gap-1 items-center">
                        <div className="w-12 h-12 flex items-center">
                            <Image src={Logo} alt="logo" />
                        </div>
                        <span className="text-blue-800 dark:text-white font-bold">
                            FLIGHTS
                        </span>
                    </div>
                </Link>

                <div className="flex items-center gap-4">
                    <ThemeSwitch />
                    {isMounted && authenticatedUser ? (
                        <div>
                            <ProfileDropdown />
                        </div>
                    ) : null}
                </div>
            </Container>
        </div>
    );
};

export default Header;
