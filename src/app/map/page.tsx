"use client";

import React, { useState } from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';

const MOCK_RESOURCES = [
    { id: 1, name: "City Oncology Center", type: "Clinic", dist: "2.4 miles", zip: "90001", services: ["Infusion", "Radiation"] },
    { id: 2, name: "Wheels for Healing", type: "Transportation", dist: "0.8 miles", zip: "90001", services: ["Ride-share", "Van Service"] },
    { id: 3, name: "Community Life Line", type: "Mental Health", dist: "1.2 miles", zip: "90001", services: ["Support Group", "Counseling"] },
    { id: 4, name: "Harvest Food Bank", type: "Nutrition", dist: "3.1 miles", zip: "90005", services: ["Prepared Meals", "SNAP Info"] },
];

export default function MapPage() {
    const [zip, setZip] = useState('90001');
    const [activeLayer, setActiveLayer] = useState<'clinics' | 'transport' | 'sdoh'>('clinics');

    const filteredResources = MOCK_RESOURCES.filter(r => r.zip === zip || zip === '');

    return (
        <main className="min-h-screen pt-32 pb-20 px-6">
            <Navbar />

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
                {/* Sidebar Controls */}
                <div className="w-full md:w-1/3 lg:w-1/4 space-y-6">
                    <Card>
                        <CardHeader>
                            <h2 className="text-xl font-bold">Find Resources</h2>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">ZIP Code</label>
                                <div className="flex gap-2 mt-2">
                                    <input
                                        type="text"
                                        className="flex-grow p-3 rounded-xl bg-muted/50 border border-border outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="Enter ZIP"
                                        value={zip}
                                        onChange={e => setZip(e.target.value)}
                                    />
                                    <Button variant="premium" className="px-4">Go</Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Map Layers</label>
                                <button
                                    onClick={() => setActiveLayer('clinics')}
                                    className={`w-full p-3 rounded-xl text-left border-2 transition-all ${activeLayer === 'clinics' ? 'border-primary bg-primary/5' : 'border-transparent hover:bg-muted'}`}
                                >
                                    🏥 Treatment Centers
                                </button>
                                <button
                                    onClick={() => setActiveLayer('transport')}
                                    className={`w-full p-3 rounded-xl text-left border-2 transition-all ${activeLayer === 'transport' ? 'border-primary bg-primary/5' : 'border-transparent hover:bg-muted'}`}
                                >
                                    🚗 Transportation
                                </button>
                                <button
                                    onClick={() => setActiveLayer('sdoh')}
                                    className={`w-full p-3 rounded-xl text-left border-2 transition-all ${activeLayer === 'sdoh' ? 'border-accent bg-accent/5' : 'border-transparent hover:bg-muted'}`}
                                >
                                    🌍 SDoH / Environmental
                                </button>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2">
                        {filteredResources.map(r => (
                            <Card key={r.id} className="cursor-pointer hover:border-primary/50 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-bold uppercase tracking-wider text-primary">{r.type}</span>
                                    <span className="text-xs text-muted-foreground">{r.dist}</span>
                                </div>
                                <h4 className="font-bold">{r.name}</h4>
                                <div className="flex flex-wrap gap-1 mt-3">
                                    {r.services.map(s => (
                                        <span key={s} className="text-[10px] px-2 py-1 bg-muted rounded-full">{s}</span>
                                    ))}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Map Mockup */}
                <div className="flex-grow min-h-[600px] glass-card rounded-3xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-[#f0f4f8] dark:bg-zinc-900 flex items-center justify-center">
                        {/* Mock Map UI */}
                        <div className="relative w-full h-full p-20">
                            {/* Just visual circles as markers */}
                            <div className="absolute top-1/4 left-1/3 w-8 h-8 bg-primary rounded-full border-4 border-white shadow-lg animate-pulse" title="City Oncology" />
                            <div className="absolute top-2/3 left-1/2 w-8 h-8 bg-accent rounded-full border-4 border-white shadow-lg animate-pulse" title="Ride Share Hub" />
                            <div className="absolute top-1/2 left-2/3 w-8 h-8 bg-primary rounded-full border-4 border-white shadow-lg animate-pulse" title="Healing Center" />

                            {activeLayer === 'sdoh' && (
                                <div className="absolute inset-0 bg-blue-500/10 backdrop-blur-sm flex items-center justify-center p-12">
                                    <Card className="max-w-md bg-white/90">
                                        <h3 className="text-lg font-bold mb-2">SDoH Dashboard: ZIP {zip}</h3>
                                        <ul className="space-y-2 text-sm">
                                            <li className="flex justify-between"><span>Air Quality:</span> <span className="text-green-500 font-bold">Good (32)</span></li>
                                            <li className="flex justify-between"><span>Transit Access:</span> <span className="text-orange-500 font-bold">Moderate</span></li>
                                            <li className="flex justify-between"><span>Food Desert Risk:</span> <span className="text-green-500 font-bold">Low</span></li>
                                        </ul>
                                    </Card>
                                </div>
                            )}

                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-black/80 px-4 py-2 rounded-full text-xs font-medium shadow-md">
                                Showing interactive map for ZIP {zip}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
