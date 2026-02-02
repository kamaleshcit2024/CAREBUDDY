"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

interface Message {
    role: 'user' | 'ai';
    content: string;
}

export default function NavigatorPage() {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'ai', content: "Hello! I'm your CJC Policy Navigator. How can I help you understand your insurance or appeals today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage })
            });
            const data = await response.json();
            setMessages(prev => [...prev, { role: 'ai', content: data.reply }]);
        } catch {
            setMessages(prev => [...prev, { role: 'ai', content: "I'm having trouble connecting to my knowledge base. Please try again in a moment." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen pt-32 pb-20 px-6">
            <Navbar />

            <div className="max-w-4xl mx-auto flex flex-col h-[70vh]">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Policy Navigator</h1>
                    <p className="text-muted-foreground">Ask anything about your coverage, clinical trials, or how to file an appeal.</p>
                </div>

                <Card className="flex-grow flex flex-col overflow-hidden p-0">
                    <div
                        ref={scrollRef}
                        className="flex-grow overflow-y-auto p-6 space-y-4"
                    >
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-4 rounded-2xl ${m.role === 'user'
                                    ? 'bg-primary text-white rounded-tr-none'
                                    : 'bg-muted/50 text-foreground rounded-tl-none'
                                    }`}>
                                    {m.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-muted/50 p-4 rounded-2xl rounded-tl-none animate-pulse">
                                    Thinking...
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t border-border bg-muted/20">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Can my insurance cover immunotherapy?"
                                className="flex-grow p-4 rounded-xl bg-background border border-border outline-none focus:ring-2 focus:ring-primary"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSend()}
                            />
                            <Button variant="premium" onClick={handleSend} disabled={isLoading}>
                                Send
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </main>
    );
}
