import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'premium' | 'outline' | 'ghost';
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'premium', children, className, ...props }) => {
    const baseStyles = "px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2";

    const variants = {
        premium: "premium-button",
        outline: "border-2 border-primary text-primary hover:bg-primary/10",
        ghost: "text-muted-foreground hover:text-foreground hover:bg-muted/50 shadow-none",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className || ''}`}
            {...props}
        >
            {children}
        </button>
    );
};
