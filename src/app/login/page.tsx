"use client"
import { FC } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from "@/components/button";
import Input from "@/components/input/TextField";
import { useMutation } from '@tanstack/react-query';
import { AuthResponse, LoginData } from '@/types/auth';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import authService from '@/services/authService';
import { parseError } from '@/utils/parseError';
import { useRouter } from "next/navigation"
import { useAuthStore } from '@/store/auth';

const validationSchema = yup.object({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters long").required("Password is required"),
});

const LoginPage: FC = () => {
    const router = useRouter()

    const { setAuthUser } = useAuthStore(state => state);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const authenticateUser = useMutation({
        mutationFn: (data: LoginData) => authService.login(data),
        onSuccess: (response: AuthResponse) => {
            setAuthUser(response.data);
            router.push("/");
        },
        onError: (error: AxiosError) => {
            toast.error(parseError(error));
        }
    });

    const onSubmit = async (data: LoginData) => {
        authenticateUser.mutateAsync(data)
    };

    return (
        <div className="mx-auto mt-10 p-4 max-w-[25rem] bg-blue-100 rounded-md dark:bg-hero-background">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <Input
                            name="email"
                            type="email"
                            placeholder="john@doe.com"
                        />

                    </div>

                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <Input
                            name="password"
                            type="password"
                            placeholder="********"
                        />

                    </div>


                    <Button type="submit" disabled={authenticateUser.isPending}>
                        {authenticateUser.isPending ? "Logging in..." : "Login"}
                    </Button>
                </form>


            </FormProvider>

            <div className="mt-4 text-center">
                <p className="text-sm">
                    Don't have an account?{' '}
                    <button
                        type="button"
                        onClick={() => router.push("/register")}
                        className="text-blue-500 hover:underline"
                    >
                        Register
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
