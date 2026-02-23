"use client";

import { useState, useEffect } from "react";
import { ProblemCard } from "@/components/ProblemCard";
import { Problem } from "@/types";
import { Input } from "@/components/ui/input";
import { Search, NotebookPen } from "lucide-react";

export default function JournalPage() {
    const [problems, setProblems] = useState<Problem[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const saved = localStorage.getItem("problems");
        if (saved) {
            setProblems(JSON.parse(saved));
        }
    }, []);

    const deleteProblem = (id: string) => {
        const updated = problems.filter((p) => p.id !== id);
        setProblems(updated);
        localStorage.setItem("problems", JSON.stringify(updated));
    };

    // Filter problems based on name or tags
    const filteredProblems = problems.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <NotebookPen className="text-blue-500" /> Solve Journal
            </h1>
            <p className="text-zinc-400 mt-2">Browse your complete history of solved patterns.</p>
            </div>

            <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <Input
                placeholder="Search problems or tags..."
                className="pl-10 bg-zinc-900 border-zinc-800 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            </div>
        </header>

        <section>
            {filteredProblems.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-zinc-800 rounded-xl">
                <p className="text-zinc-500">
                {searchQuery ? "No matches found for your search." : "Your journal is empty."}
                </p>
            </div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProblems.map((problem) => (
                <ProblemCard 
                    key={problem.id} 
                    problem={problem} 
                    onDelete={deleteProblem} 
                />
                ))}
            </div>
            )}
        </section>
        </div>
    );
    }