import { FC, ReactNode } from 'react';
import { Button as HeadlessButton } from '@headlessui/react';
import clsx from 'clsx';

interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'danger' | 'primaryOutlined' | 'secondaryOutlined' | 'dangerOutlined';
    size?: 'small' | 'medium' | 'large';
    children: ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
}

const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-800 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    primaryOutlined: 'border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
    secondaryOutlined: 'border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white',
    dangerOutlined: 'border border-red-500 text-red-500 hover:bg-red-500 hover:text-white',
};

const sizeClasses = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
};

const Button: FC<ButtonProps> = ({
    variant = 'primary',
    size = 'medium',
    children,
    onClick,
    type = 'button',
    disabled = false,
    className,
}) => {
    return (
        <HeadlessButton
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={clsx(
                'rounded-md focus:outline-none focus:ring-0 focus:ring-offset-0',
                variantClasses[variant],
                sizeClasses[size],
                { 'opacity-50 cursor-not-allowed': disabled },
                className
            )}
        >
            {children}
        </HeadlessButton>
    );
};

export default Button;
