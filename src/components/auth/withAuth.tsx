"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';

const withAuth = (WrappedComponent: React.FC) => {
    const AuthHOC: React.FC = (props) => {
        const router = useRouter();
        const authenticatedUser = useAuthStore(state => state.authenticatedUser);
        const [isMounted, setIsMounted] = useState(false);

        useEffect(() => {
            setIsMounted(true);
        }, []);

        useEffect(() => {
            if (isMounted && !authenticatedUser) {
                router.push('/login');
            }
        }, [authenticatedUser, isMounted, router]);

        if (!isMounted || !authenticatedUser) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };

    return AuthHOC;
};

export default withAuth;
