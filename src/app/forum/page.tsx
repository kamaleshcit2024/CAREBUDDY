"use client";

import React, { useState } from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const CATEGORIES = [
    { id: 'general', name: 'General Support', count: 124, icon: '🤝' },
    { id: 'insurance', name: 'Insurance & Policy', count: 85, icon: '📜' },
    { id: 'caregiver', name: 'Caregiver Corner', count: 62, icon: '🏠' },
    { id: 'survivor', name: 'Survivorship', count: 45, icon: '🌱' },
];

const THREADS = [
    { id: 1, category: 'insurance', title: 'Tips for appealing an immunotherapy denial?', author: 'Maria S.', replies: 12, time: '2h ago', status: 'Active' },
    { id: 2, category: 'general', title: 'Just diagnosed with Stage II Breast Cancer. Looking for others.', author: 'John D.', replies: 28, time: '5h ago', status: 'Community' },
    { id: 3, category: 'caregiver', title: 'Managing burnout while working full-time.', author: 'Sarah L.', replies: 15, time: '1d ago', status: 'Important' },
];

export default function ForumPage() {
    const [activeCategory, setActiveCategory] = useState('all');

    return (
        <main className="min-h-screen pt-32 pb-20 px-6">
            <Navbar />

            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Peer Support Network</h1>
                        <p className="text-muted-foreground text-lg">You don&apos;t have to walk this journey alone.</p>
                    </div>
                    <Button variant="premium">+ Start Discussion</Button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Categories Sidebar */}
                    <div className="lg:col-span-1 space-y-4">
                        <h3 className="font-bold text-lg mb-4 px-2">Categories</h3>
                        <button
                            onClick={() => setActiveCategory('all')}
                            className={`w-full flex justify-between items-center p-4 rounded-2xl transition-all ${activeCategory === 'all' ? 'bg-primary text-white shadow-lg' : 'hover:bg-muted'
                                }`}
                        >
                            <span className="font-semibold">All Discussions</span>
                        </button>
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`w-full flex justify-between items-center p-4 rounded-2xl transition-all ${activeCategory === cat.id ? 'bg-primary text-white shadow-lg' : 'hover:bg-muted'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span>{cat.icon}</span>
                                    <span className="font-semibold">{cat.name}</span>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full ${activeCategory === cat.id ? 'bg-white/20' : 'bg-muted-foreground/20'}`}>
                                    {cat.count}
                                </span>
                            </button>
                        ))}

                        <Card className="mt-8 bg-accent/5 border-accent/20">
                            <h4 className="font-bold mb-2">Need Help Now?</h4>
                            <p className="text-xs text-muted-foreground mb-4">Our AI moderators monitor for urgent posts, but you can always reach a professional.</p>
                            <Button variant="outline" className="w-full text-xs py-2">Emergency Hub</Button>
                        </Card>
                    </div>

                    {/* Discussion Threads List */}
                    <div className="lg:col-span-3 space-y-4">
                        <div className="flex gap-4 mb-4 border-b border-border pb-2 px-2">
                            <button className="text-sm font-bold text-primary border-b-2 border-primary pb-2">Latest</button>
                            <button className="text-sm font-medium text-muted-foreground pb-2 hover:text-foreground">Trending</button>
                            <button className="text-sm font-medium text-muted-foreground pb-2 hover:text-foreground">Unanswered</button>
                        </div>

                        {THREADS.filter(t => activeCategory === 'all' || t.category === activeCategory).map(thread => (
                            <Card key={thread.id} className="cursor-pointer hover:border-primary/50 transition-all hover:translate-x-1">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${thread.status === 'Active' ? 'bg-green-100 text-green-700' :
                                                thread.status === 'Important' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                {thread.status}
                                            </span>
                                            <span className="text-xs text-muted-foreground">in {CATEGORIES.find(c => c.id === thread.category)?.name}</span>
                                        </div>
                                        <h3 className="text-xl font-bold mb-3">{thread.title}</h3>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <span>By <strong>{thread.author}</strong></span>
                                            <span>•</span>
                                            <span>{thread.time}</span>
                                        </div>
                                    </div>
                                    <div className="text-center p-3 bg-muted/30 rounded-2xl min-w-[70px]">
                                        <div className="text-lg font-bold">{thread.replies}</div>
                                        <div className="text-[10px] uppercase font-bold tracking-widest opacity-50">Replies</div>
                                    </div>
                                </div>
                            </Card>
                        ))}

                        <div className="pt-8 text-center">
                            <Button variant="ghost">Load more discussions</Button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
