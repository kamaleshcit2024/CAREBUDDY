import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    animate?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, animate = false }) => {
    return (
        <div className={`glass-card p-6 rounded-2xl ${animate ? 'animate-float' : ''} ${className || ''}`}>
            {children}
        </div>
    );
};

export const CardHeader: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <div className={`mb-4 ${className || ''}`}>
        {children}
    </div>
);

export const CardContent: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <div className={className}>
        {children}
    </div>
);
