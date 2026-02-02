"use client";

import React, { useState } from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';

export default function WellnessPage() {
    const [activeTab, setActiveTab] = useState<'financial' | 'survivorship'>('financial');

    // Financial State
    const [costEstimate, setCostEstimate] = useState({ treatment: 0, drug: 0, transp: 0 });

    // Survivorship State
    const [checklist, setChecklist] = useState([
        { id: 1, text: "Follow-up blood work", done: false },
        { id: 2, text: "Annual Mammogram/Scan", done: true },
        { id: 3, text: "Nutrition Consultation", done: false },
        { id: 4, text: "Mental Health Check-in", done: false },
    ]);

    const totalOOP = Object.values(costEstimate).reduce((a, b) => a + b, 0);

    return (
        <main className="min-h-screen pt-32 pb-20 px-6">
            <Navbar />

            <div className="max-w-7xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold mb-4">Wellness & Care Tracker</h1>
                    <div className="flex gap-4 p-1 bg-muted rounded-2xl w-fit">
                        <button
                            onClick={() => setActiveTab('financial')}
                            className={`px-6 py-2 rounded-xl transition-all ${activeTab === 'financial' ? 'bg-white shadow-sm font-bold' : 'text-muted-foreground'}`}
                        >
                            Financial Wellness
                        </button>
                        <button
                            onClick={() => setActiveTab('survivorship')}
                            className={`px-6 py-2 rounded-xl transition-all ${activeTab === 'survivorship' ? 'bg-white shadow-sm font-bold' : 'text-muted-foreground'}`}
                        >
                            Survivorship Tracker
                        </button>
                    </div>
                </header>

                {activeTab === 'financial' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card>
                            <CardHeader>
                                <h3 className="text-2xl font-bold">Cost Estimator</h3>
                                <p className="text-sm text-muted-foreground">Estimate your potential out-of-pocket expenses based on your plan.</p>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <label className="text-sm font-medium">Estimated Treatment Copays ($)</label>
                                    <input
                                        type="number"
                                        className="w-full p-4 rounded-xl bg-muted/50 border border-border mt-2"
                                        value={costEstimate.treatment}
                                        onChange={e => setCostEstimate({ ...costEstimate, treatment: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Drug / Medication Costs ($)</label>
                                    <input
                                        type="number"
                                        className="w-full p-4 rounded-xl bg-muted/50 border border-border mt-2"
                                        value={costEstimate.drug}
                                        onChange={e => setCostEstimate({ ...costEstimate, drug: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Transportation / Lodging ($)</label>
                                    <input
                                        type="number"
                                        className="w-full p-4 rounded-xl bg-muted/50 border border-border mt-2"
                                        value={costEstimate.transp}
                                        onChange={e => setCostEstimate({ ...costEstimate, transp: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <div className="space-y-8">
                            <Card className="bg-primary/5 border-primary/20">
                                <h4 className="text-xl font-bold text-primary mb-4">Total Estimated OOP</h4>
                                <div className="text-5xl font-black mb-2">${totalOOP}</div>
                                <p className="text-sm text-muted-foreground">This is an estimate based on your inputs. We detected <strong>2 assistance programs</strong> that may help reduce this.</p>
                            </Card>

                            <Card>
                                <h4 className="font-bold mb-4">Recommended Assistance</h4>
                                <div className="space-y-3">
                                    <div className="p-4 border border-border rounded-xl flex justify-between items-center">
                                        <div>
                                            <p className="font-bold">PAF Co-Pay Relief</p>
                                            <p className="text-xs text-muted-foreground">Up to $5,000/year for eligible diagnoses.</p>
                                        </div>
                                        <Button variant="outline" className="text-xs py-1 px-4">Apply</Button>
                                    </div>
                                    <div className="p-4 border border-border rounded-xl flex justify-between items-center">
                                        <div>
                                            <p className="font-bold">ACS Road To Recovery</p>
                                            <p className="text-xs text-muted-foreground">Free transportation to treatment.</p>
                                        </div>
                                        <Button variant="outline" className="text-xs py-1 px-4">Learn More</Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                )}

                {activeTab === 'survivorship' && (
                    <div className="max-w-4xl mx-auto space-y-8">
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <h3 className="text-2xl font-bold">Survivorship Care Plan</h3>
                                    <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full font-bold uppercase">Personalized</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {checklist.map(item => (
                                        <div
                                            key={item.id}
                                            onClick={() => setChecklist(checklist.map(c => c.id === item.id ? { ...c, done: !c.done } : c))}
                                            className={`p-4 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${item.done ? 'bg-muted/30 border-transparent opacity-60' : 'border-border hover:border-primary/50'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${item.done ? 'bg-primary border-primary' : 'border-muted'}`}>
                                                    {item.done && <span className="text-white text-xs">✓</span>}
                                                </div>
                                                <span className={item.done ? 'line-through' : 'font-medium'}>{item.text}</span>
                                            </div>
                                            <span className="text-xs text-muted-foreground">Due: Mar 2026</span>
                                        </div>
                                    ))}
                                </div>
                                <Button variant="premium" className="w-full mt-8">+ Add Personalized Note</Button>
                            </CardContent>
                        </Card>

                        <Card className="bg-accent/5">
                            <h4 className="font-bold mb-4">Survivorship Resources</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 glass-card border-none">
                                    <h5 className="font-bold mb-1">Post-Treatment Nutrition</h5>
                                    <p className="text-xs text-muted-foreground">Guides for managing long-term side effects.</p>
                                </div>
                                <div className="p-4 glass-card border-none">
                                    <h5 className="font-bold mb-1">Peer Support Groups</h5>
                                    <p className="text-xs text-muted-foreground">Connect with others in survivorship.</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </main>
    );
}
