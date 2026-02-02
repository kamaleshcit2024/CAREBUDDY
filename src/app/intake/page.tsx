"use client";

import React, { useState } from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';

const STEPS = [
    "Persona",
    "Diagnosis",
    "Challenges",
    "Location"
];

export default function IntakePage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        persona: '',
        cancerType: '',
        stage: '',
        challenges: [] as string[],
        zipCode: '',
        language: 'English'
    });

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

    const toggleChallenge = (challenge: string) => {
        setFormData(prev => ({
            ...prev,
            challenges: prev.challenges.includes(challenge)
                ? prev.challenges.filter(c => c !== challenge)
                : [...prev.challenges, challenge]
        }));
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            await fetch('/api/intake', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            window.location.href = '/navigator';
        } catch {
            window.location.href = '/navigator'; // Fallback
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen pt-32 pb-20 px-6">
            <Navbar />

            <div className="max-w-3xl mx-auto">
                {/* Progress Bar */}
                <div className="flex justify-between mb-12 relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -translate-y-1/2 -z-10" />
                    <div
                        className="absolute top-1/2 left-0 h-0.5 bg-primary transition-all duration-500 -translate-y-1/2 -z-10"
                        style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
                    />
                    {STEPS.map((step, idx) => (
                        <div
                            key={step}
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${idx <= currentStep ? 'bg-primary text-white scale-110' : 'bg-muted text-muted-foreground'
                                }`}
                        >
                            {idx + 1}
                        </div>
                    ))}
                </div>

                <Card className="min-h-[400px] flex flex-col justify-between">
                    <CardHeader>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            {currentStep === 0 && "Tell us who you are"}
                            {currentStep === 1 && "About the diagnosis"}
                            {currentStep === 2 && "What are you facing today?"}
                            {currentStep === 3 && "Final details"}
                        </h2>
                        <p className="text-muted-foreground mt-2">
                            {currentStep === 0 && "We tailor our support based on your role."}
                            {currentStep === 1 && "This helps us find specific resources for your type of cancer."}
                            {currentStep === 2 && "Select all that apply. We&apos;re here to help you navigate these."}
                            {currentStep === 3 && "Where are you located? This helps us find local resources."}
                        </p>
                    </CardHeader>

                    <CardContent className="flex-grow py-8">
                        {currentStep === 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {["Patient", "Caregiver", "Survivor", "Advocate"].map(role => (
                                    <button
                                        key={role}
                                        onClick={() => { setFormData({ ...formData, persona: role }); nextStep(); }}
                                        className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${formData.persona === role ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                                            }`}
                                    >
                                        <span className="text-xl font-semibold">{role}</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Cancer Type</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Breast Cancer, Lung Cancer..."
                                        className="w-full p-4 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-primary outline-none"
                                        value={formData.cancerType}
                                        onChange={e => setFormData({ ...formData, cancerType: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Stage (Optional)</label>
                                    <select
                                        className="w-full p-4 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-primary outline-none"
                                        value={formData.stage}
                                        onChange={e => setFormData({ ...formData, stage: e.target.value })}
                                    >
                                        <option value="">Select Stage</option>
                                        <option value="Stage 1">Stage 1</option>
                                        <option value="Stage 2">Stage 2</option>
                                        <option value="Stage 3">Stage 3</option>
                                        <option value="Stage 4">Stage 4</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {[
                                    "Insurance Denials",
                                    "Transportation Issues",
                                    "Financial Toxicity",
                                    "Mental Health Support",
                                    "Clinical Trial Access",
                                    "Nutrition Assistance",
                                    "Employment Rights",
                                    "Caregiver Respite"
                                ].map(issue => (
                                    <button
                                        key={issue}
                                        onClick={() => toggleChallenge(issue)}
                                        className={`p-4 rounded-xl border-2 transition-all duration-300 text-left flex items-center gap-3 ${formData.challenges.includes(issue) ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                                            }`}
                                    >
                                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${formData.challenges.includes(issue) ? 'bg-primary border-primary' : 'border-muted'
                                            }`}>
                                            {formData.challenges.includes(issue) && <span className="text-white text-xs">✓</span>}
                                        </div>
                                        <span>{issue}</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">ZIP Code</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 90210"
                                        className="w-full p-4 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-primary outline-none"
                                        value={formData.zipCode}
                                        onChange={e => setFormData({ ...formData, zipCode: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Preferred Language</label>
                                    <select
                                        className="w-full p-4 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-primary outline-none"
                                        value={formData.language}
                                        onChange={e => setFormData({ ...formData, language: e.target.value })}
                                    >
                                        <option value="English">English</option>
                                        <option value="Spanish">Spanish</option>
                                        <option value="French">French</option>
                                        <option value="Mandarin">Mandarin</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </CardContent>

                    <div className="flex justify-between gap-4 mt-8">
                        <Button
                            variant="outline"
                            onClick={prevStep}
                            className={currentStep === 0 ? 'invisible' : ''}
                        >
                            Back
                        </Button>
                        {currentStep === STEPS.length - 1 ? (
                            <Button variant="premium" onClick={handleSubmit} disabled={submitting}>
                                {submitting ? "Processing..." : "Finish & View My Roadmap"}
                            </Button>
                        ) : (
                            <Button variant="premium" onClick={nextStep}>
                                Continue
                            </Button>
                        )}
                    </div>
                </Card>
            </div>
        </main>
    );
}
