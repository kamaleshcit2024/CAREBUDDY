import { Navbar } from "@/components/ui/Navbar";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto text-center mb-24">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-float">
          Navigate Your Cancer Journey <br />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            With Compassion & Certainty
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
          A holistic, AI-assisted platform that anticipates challenges, explains complex policies,
          and connects you with the resources you need — from diagnosis through survivorship.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/intake">
            <Button variant="premium" className="text-lg">Start Your Intake</Button>
          </Link>
          <Link href="/navigator">
            <Button variant="outline" className="text-lg">Explore Policy Navigator</Button>
          </Link>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        <Card>
          <CardHeader>
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-xl font-bold">Smart Intake</h3>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              AI-driven detection of insurance denials, financial stress, and transportation barriers.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">📜</span>
            </div>
            <h3 className="text-xl font-bold">Policy Navigator</h3>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Interactive Q&A for coverage questions and automated appeal letter generation.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">📍</span>
            </div>
            <h3 className="text-xl font-bold">Resource Finder</h3>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Map-based discovery of clinics, food support, and mental health groups with SDoH layers.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Stats/Social Proof Section */}
      <section className="max-w-5xl mx-auto glass-card p-12 rounded-3xl text-center">
        <h2 className="text-3xl font-bold mb-8">Empowering Patients, Enriching Lives</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">10+</div>
            <div className="text-muted-foreground uppercase tracking-wider text-sm">Languages Supported</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-accent mb-2">24/7</div>
            <div className="text-muted-foreground uppercase tracking-wider text-sm">AI Policy Assistance</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">100%</div>
            <div className="text-muted-foreground uppercase tracking-wider text-sm">Privacy Compliant</div>
          </div>
        </div>
      </section>
    </main>
  );
}
