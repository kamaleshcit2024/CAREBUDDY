"use client";

import React, { useState } from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const ISSUES = [
    {
        id: 'insurance',
        title: 'Insurance Denials',
        stat: '1 in 4 patients face denials',
        description: 'Understanding why denials happen and how the law protects your right to appeal.',
        actions: ['Check Prior Auth Rules', 'Generate Appeal Letter', 'Learn State Rights']
    },
    {
        id: 'financial',
        title: 'Financial Toxicity',
        stat: '42% of patients deplete assets',
        description: 'Managing the hidden costs of cancer: from copays to lost wages and transportation.',
        actions: ['Estimate OOP Costs', 'Find Assistance Programs', 'Budgeting Guide']
    },
    {
        id: 'employment',
        title: 'Employment Rights',
        stat: 'ADA & FMLA Protection',
        description: 'Your rights to reasonable accommodations and medical leave during and after treatment.',
        actions: ['FMLA Checklist', 'Talking to HR', 'Legal Resources']
    },
    {
        id: 'nutrition',
        title: 'Nutrition Support',
        stat: 'Crucial for Rehab',
        description: 'How to access specialized nutrition and meal support services in your local area.',
        actions: ['Meal Program Finder', 'Dietary Guidelines', 'Nutritionist Chat']
    }
];

export default function HubPage() {
    const [selectedIssue, setSelectedIssue] = useState(ISSUES[0]);

    return (
        <main className="min-h-screen pt-32 pb-20 px-6">
            <Navbar />

            <div className="max-w-7xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold mb-4">Issue Spotlight & Education</h1>
                    <p className="text-xl text-muted-foreground">Empowering you with knowledge, data, and action steps.</p>
                </header>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Issue List */}
                    <div className="w-full lg:w-1/3 space-y-4">
                        {ISSUES.map(issue => (
                            <button
                                key={issue.id}
                                onClick={() => setSelectedIssue(issue)}
                                className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ${selectedIssue.id === issue.id ? 'border-primary bg-primary/5 shadow-md' : 'border-border hover:border-primary/50'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg">{issue.title}</h3>
                                    <span className="text-[10px] px-2 py-1 bg-muted rounded-full">Spotlight</span>
                                </div>
                                <div className="text-sm font-medium text-primary mb-2">{issue.stat}</div>
                                <p className="text-xs text-muted-foreground line-clamp-2">{issue.description}</p>
                            </button>
                        ))}
                    </div>

                    {/* Issue Detail View */}
                    <div className="flex-grow">
                        <Card className="min-h-[500px]">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-3xl font-bold">{selectedIssue.title}</h2>
                                <div className="text-sm px-4 py-2 bg-accent/10 text-accent rounded-full font-bold">
                                    Monthly Theme: Awareness
                                </div>
                            </div>

                            <div className="prose prose-slate max-w-none mb-12">
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    {selectedIssue.description}
                                </p>
                                <div className="h-0.5 bg-muted my-8" />

                                <h3 className="text-xl font-bold mb-4">Key Statistics 📊</h3>
                                <Card className="bg-muted/10 border-none mb-8">
                                    <p className="text-lg">
                                        Recent data shows that <span className="text-primary font-bold">{selectedIssue.stat}</span>.
                                        This highlights the systemic nature of the challenge and why active navigation is essential.
                                    </p>
                                </Card>

                                <h3 className="text-xl font-bold mb-4">What You Can Do (Action Steps) ✅</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {selectedIssue.actions.map(action => (
                                        <div key={action} className="flex items-center gap-4 p-4 glass-card border-none">
                                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                                →
                                            </div>
                                            <span className="font-medium">{action}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8 flex gap-4">
                                <Button variant="premium">Go to Module</Button>
                                <Button variant="outline">Download Resource Guide</Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
}
