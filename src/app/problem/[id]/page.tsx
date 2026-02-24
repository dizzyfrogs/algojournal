"use client";

import { DifficultyBadge } from "@/components/DifficultyBadge";
import { Button } from "@/components/ui/button";
import { Problem } from "@/types";
import { ArrowLeft, Calendar, Brain, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProblemJournal() {
    const { id } = useParams();
    const router = useRouter();
    const [problem, setProblem] = useState<Problem | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedNotes, setEditedNotes] = useState("");

    useEffect(() => {
        const saved = localStorage.getItem("problems");
        if (saved) {
            const list: Problem[] = JSON.parse(saved);
            const found = list.find((p) => p.id === id);
            if (found) {
                setProblem(found);
                setEditedNotes(found.notes);
            }
        }
    }, [id]);

    const handleSaveNotes = () => {
        const stored = localStorage.getItem("problems");
        if (stored && problem) {
            const allProblems: Problem[] = JSON.parse(stored);
            const updatedProblems = allProblems.map((p) =>
                p.id === id ? { ...p, notes: editedNotes } : p
            );
            localStorage.setItem("problems", JSON.stringify(updatedProblems));
            setProblem({ ...problem, notes: editedNotes });
            setIsEditing(false);
        }
    };

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this entry? This action cannot be undone.")) {
            const stored = localStorage.getItem("problems");
            if (stored) {
                const allProblems: Problem[] = JSON.parse(stored);
                const updatedProblems = allProblems.filter((p) => p.id !== id);
                localStorage.setItem("problems", JSON.stringify(updatedProblems));
                router.push("/");
            }
        }
    };

    if (!problem) return <div className="p-10 text-white">Entry not found...</div>

    return (
      <div className="max-w-3xl mx-auto py-10 px-6 animate-in fade-in duration-500">
        <div className="flex justify-between items-center mb-8">
            <Button
                variant="ghost"
                className="text-zinc-400 hover:text-white gap-2 p-0 h-auto"
                onClick={() => router.back()}    
            >
                <ArrowLeft size={16} /> Back to Dashboard
            </Button>
            
            <Button
                variant="ghost"
                size="sm"
                className="text-zinc-500 hover:text-red-400 hover:bg-red-400/10 gap-2"
                onClick={handleDelete}
            >
                <Trash2 size={16} /> Delete Entry
            </Button>
        </div>

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
                    <Badge key={tag} variant="outline" className="border-zinc-700 text-zinc-400">{tag}</Badge>
                ))}
            </div>
        </header>

        <section className="space-y-8">
            <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
                <h2 className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Brain size={16} /> Confidence Score: {problem.confidence}/5
                </h2>
                <div className="w-full h-2 bg-zinc-800 rounded-full">
                    <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{width: `${(problem.confidence / 5) * 100}%`}}
                    />
                </div>
            </div>
            
            <div className="prose prose-invert max-w-none">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-white">Notes</h2>
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-zinc-400 hover:text-white"
                        onClick={() => isEditing ? handleSaveNotes() : setIsEditing(true)}
                    >
                        {isEditing ? "Save Changes" : "Edit Notes"}
                    </Button>
                </div>

                {isEditing ? (
                    <Textarea 
                        value={editedNotes}
                        onChange={(e) => setEditedNotes(e.target.value)}
                        className="bg-zinc-900 border-zinc-800 min-h-[200px] text-zinc-300 focus:ring-blue-500"
                    />
                ) : (
                    <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap text-lg">
                        {problem.notes || "No notes provided for this solve yet."}
                    </p>
                )}
            </div>
        </section>
      </div>  
    );
}