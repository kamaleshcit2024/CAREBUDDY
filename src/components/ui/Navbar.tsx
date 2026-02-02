import React from 'react';
import Link from 'next/link';
import { Button } from './Button';

export const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
            <div className="max-w-7xl mx-auto glass-card flex items-center justify-between px-8 py-3 rounded-full">
                <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    CJC
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link href="/navigator" className="nav-link">Policy Navigator</Link>
                    <Link href="/map" className="nav-link">Resource Finder</Link>
                    <Link href="/hub" className="nav-link">Issue Hub</Link>
                    <Link href="/forum" className="nav-link">Community</Link>
                    <Link href="/wellness" className="nav-link">Wellness</Link>
                    <Link href="/advocacy" className="nav-link">Advocacy</Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/intake">
                        <Button variant="premium">Get Started</Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};
