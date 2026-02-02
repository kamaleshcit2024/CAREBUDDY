"use client";

import React, { useState } from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const BILLS = [
    { id: 1, title: "HB-102: Cancer Treatment Fairness Act", state: "CA", status: "In Committee", impact: "High", description: "Ensures parity in coverage between oral and intravenous chemotherapy." },
    { id: 2, title: "SB-45: Medical Debt Protection", state: "NY", status: "Passed Senate", impact: "Critical", description: "Limits the ability of hospitals to place liens on primary residences for medical debt." },
    { id: 3, title: "HB-201: Telehealth Expansion", state: "TX", status: "Under Review", impact: "Medium", description: "Permanent expansion of telehealth coverage for cancer patients in rural areas." },
];

export default function AdvocacyPage() {
    const [signed, setSigned] = useState<number[]>([]);

    const handleSign = (id: number) => {
        if (!signed.includes(id)) {
            setSigned([...signed, id]);
        }
    };

    return (
        <main className="min-h-screen pt-32 pb-20 px-6">
            <Navbar />

            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Advocacy & Policy Action Hub</h1>
                        <p className="text-muted-foreground text-lg">Turn your experience into equity. Your voice matters.</p>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="outline">Find My Legislator</Button>
                        <Button variant="premium">Join Advocacy Network</Button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Legislative Tracker */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-2xl font-bold px-2">Local & State Legislation</h2>
                        {BILLS.map(bill => (
                            <Card key={bill.id} className="relative overflow-hidden">
                                <div className={`absolute top-0 left-0 w-1 h-full ${bill.impact === 'Critical' ? 'bg-red-500' : bill.impact === 'High' ? 'bg-orange-500' : 'bg-blue-500'
                                    }`} />
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="text-xs font-bold text-primary uppercase tracking-widest">{bill.state} • {bill.status}</span>
                                        <h3 className="text-xl font-bold mt-1">{bill.title}</h3>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${bill.impact === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                                        }`}>
                                        {bill.impact} Impact
                                    </div>
                                </div>
                                <p className="text-muted-foreground mb-6">{bill.description}</p>
                                <div className="flex gap-4">
                                    <Button
                                        variant={signed.includes(bill.id) ? "outline" : "premium"}
                                        className="text-sm"
                                        onClick={() => handleSign(bill.id)}
                                        disabled={signed.includes(bill.id)}
                                    >
                                        {signed.includes(bill.id) ? "✓ Signed Petition" : "Sign Petition"}
                                    </Button>
                                    <Button variant="ghost" className="text-sm">View Full Bill</Button>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Action Hub Sidebar */}
                    <div className="space-y-6">
                        <Card className="bg-primary/5">
                            <h3 className="font-bold text-lg mb-4">ACS CAN Integration</h3>
                            <p className="text-sm text-muted-foreground mb-6">
                                Directly connect with the American Cancer Society Cancer Action Network (ACS CAN) to leverage their national advocacy tools.
                            </p>
                            <div className="space-y-3">
                                <div className="p-4 bg-white/50 rounded-xl flex items-center gap-3">
                                    <span className="text-xl">📞</span>
                                    <span className="text-sm font-medium">One-click Legislative Call</span>
                                </div>
                                <div className="p-4 bg-white/50 rounded-xl flex items-center gap-3">
                                    <span className="text-xl">✍️</span>
                                    <span className="text-sm font-medium">Tailored Email Templates</span>
                                </div>
                            </div>
                            <Button variant="premium" className="w-full mt-6">Launch ACS CAN Tools</Button>
                        </Card>

                        <Card>
                            <h3 className="font-bold text-lg mb-4">Impact Analytics</h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span>Community Engagement</span>
                                        <span className="font-bold">84%</span>
                                    </div>
                                    <div className="w-full h-2 bg-muted rounded-full">
                                        <div className="w-[84%] h-full bg-primary rounded-full" />
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    In your ZIP code, advocacy for <strong>Infusion Parity</strong> has increased by 12% this month.
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
}
