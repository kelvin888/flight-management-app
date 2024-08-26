"use client"
import { FC } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from "@/components/button";
import Input from "@/components/input/TextField";
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import authService from '@/services/authService';
import { RegistrationData } from '@/types/auth';
import { parseError } from '@/utils/parseError';
import { useRouter } from 'next/navigation';

const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters long").required("Password is required"),
});

const RegistrationPage: FC = () => {
    const router = useRouter()

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const registerUser = useMutation({
        mutationFn: (data: RegistrationData) => authService.register(data),
        onSuccess: () => {
            toast.success("User created successfully")
            router.push("/login")
        },
        onError: (error: AxiosError) => {
            toast.error(parseError(error))
        }
    });

    const onSubmit = async (data: RegistrationData) => {
        registerUser.mutateAsync(data)
    };

    return (
        <div className="mx-auto mt-10 p-4 max-w-[25rem] bg-blue-100 rounded-md dark:bg-hero-background">
            <h1 className="text-2xl font-bold mb-4">Register</h1>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Name</label>
                        <Input
                            name="name"
                            placeholder="John Doe"
                        />
                    </div>

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

                    <Button type="submit" disabled={registerUser.isPending}>
                        {registerUser.isPending ? "Registering..." : "Register"}
                    </Button>
                </form>
            </FormProvider>

            <div className="mt-4 text-center">
                <p className="text-sm">
                    Already have an account?{' '}
                    <button
                        className="text-blue-600 hover:underline"
                        onClick={() => router.push('/login')}
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default RegistrationPage;
