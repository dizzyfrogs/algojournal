"use client";

import { DifficultyBadge } from "@/components/DifficultyBadge";
import { Button } from "@/components/ui/button";
import { Problem } from "@/types";
import { ArrowLeft, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProblemJournal() {
    const { id } = useParams();
    const router = useRouter();
    const [problem, setProblem] = useState<Problem | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem("problems");
        if (saved) {
            const list: Problem[] = JSON.parse(saved);
            const found = list.find((p) => p.id === id);
            setProblem(found || null);
        }
    }, [id]);

    if (!problem) return <div className="p-10 text-white">Entry not found...</div>

    return (
      <div className="max-w-3xl mx-auto py-10 px-6 animate-in fade-in duration-500">
        <Button
            variant="ghost"
            className="mb-8 text-zinc-400 hover:text-white gap-2"
            onClick={() => router.back()}    
        >
            <ArrowLeft size={16} /> Back to Dashboard
        </Button>

        <header className="space-y-4 mb-10">
            <div className="flex items-center gap-3">
                <DifficultyBadge type={problem.difficulty} />
                <span className="text-zinc-500 flex items-center gap-1 text-sm">
                    <Calendar size={14} /> {new Date(problem.dateSolved).toLocaleDateString()}
                </span>
            </div>
            <h1 className="text-4xl font-bold text-white">{problem.name}</h1>
            <div className="flex flex-wrap gap-2">
                {problem.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="border-zinc-700 text-zinc-400">#{tag}</Badge>
                ))}
            </div>
        </header>

        <section className="space-y-8">
            <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
                <h2 className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    Confidence Score: {problem.confidence}/5
                </h2>
                <div className="w-full h-2 bg-zinc-800 rounded-full">
                    <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{width: `${(problem.confidence / 5) * 100}%`}}
                    />
                </div>
            </div>
            
            <div className="prose prose-invert max-w-none">
                <h2 className="text-xl font-semibold text-white mb-4">Notes</h2>
                <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap text-lg">
                    {problem.notes || "No notes provided for this solve yet."}
                </p>
            </div>
        </section>
      </div>  
    );
}