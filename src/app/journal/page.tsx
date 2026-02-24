"use client";

import { useState, useEffect } from "react";
import { Problem } from "@/types";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, NotebookPen, Trash2, Calendar, Tag as TagIcon } from "lucide-react";
import { DifficultyBadge } from "@/components/DifficultyBadge";
import Link from "next/link";

export default function JournalPage() {
    const [problems, setProblems] = useState<Problem[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

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

    // Get all unique tags
    const allTags = Array.from(new Set(problems.flatMap(p => p.tags)));

    // Toggle tag filter
    const toggleTag = (tag: string) => {
        setSelectedTags(prev => 
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    // Filter problems based on search and selected tags
    const filteredProblems = problems.filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => p.tags.includes(tag));
        return matchesSearch && matchesTags;
    });

    const getConfidenceText = (val: number) => {
        const texts = ["Struggled", "Unsure", "Neutral", "Confident", "Mastered"];
        return texts[val - 1] || "Unknown";
    };

    const getConfidenceColor = (val: number) => {
        const colors = ["#ef4444", "#f97316", "#eab308", "#84cc16", "#22c55e"];
        return colors[val - 1] || "#6b7280";
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <header className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <NotebookPen className="text-blue-500" /> Solve Journal
                        </h1>
                        <p className="text-zinc-400 mt-2">Browse your complete history of solved patterns.</p>
                    </div>

                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                        <Input
                            placeholder="Search problems..."
                            className="pl-10 bg-zinc-900 border-zinc-800 focus:ring-blue-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Tag Filters */}
                {allTags.length > 0 && (
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-zinc-400">
                            <TagIcon size={16} />
                            Filter by tags:
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {allTags.map((tag) => {
                                const isSelected = selectedTags.includes(tag);
                                return (
                                    <Badge 
                                        key={tag} 
                                        variant={isSelected ? "default" : "outline"}
                                        className={`cursor-pointer py-1 px-3 ${
                                            isSelected 
                                                ? "bg-blue-600 hover:bg-blue-700" 
                                                : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
                                        }`}
                                        onClick={() => toggleTag(tag)}
                                    >
                                        {tag}
                                    </Badge>
                                );
                            })}
                            {selectedTags.length > 0 && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSelectedTags([])}
                                    className="text-zinc-400 hover:text-zinc-200"
                                >
                                    Clear filters
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </header>

            <section>
                {filteredProblems.length === 0 ? (
                    <div className="text-center py-20 border-2 border-dashed border-zinc-800 rounded-xl">
                        <p className="text-zinc-500">
                            {searchQuery || selectedTags.length > 0 
                                ? "No matches found for your search and filters." 
                                : "Your journal is empty."
                            }
                        </p>
                    </div>
                ) : (
                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-zinc-800/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                                            Problem
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                                            Difficulty
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                                            Solved
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                                            Tags
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                                            Confidence
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-medium text-zinc-400 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800">
                                    {filteredProblems.map((problem) => (
                                        <tr key={problem.id} className="hover:bg-zinc-800/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <Link 
                                                    href={`/problem/${problem.id}`}
                                                    className="text-white hover:text-blue-400 font-medium transition-colors"
                                                >
                                                    {problem.name}
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4">
                                                <DifficultyBadge type={problem.difficulty} />
                                            </td>
                                            <td className="px-6 py-4 text-sm text-zinc-400">
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={14} />
                                                    {new Date(problem.dateSolved).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {problem.tags.slice(0, 3).map((tag) => (
                                                        <Badge 
                                                            key={tag} 
                                                            variant="outline"
                                                            className="text-[10px] bg-zinc-800 px-2 py-0.5 rounded text-zinc-300 border border-zinc-700"
                                                        >
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                    {problem.tags.length > 3 && (
                                                        <span className="text-xs text-zinc-500">
                                                            +{problem.tags.length - 3} more
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span 
                                                    className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded"
                                                    style={{ 
                                                        color: getConfidenceColor(problem.confidence),
                                                        backgroundColor: `${getConfidenceColor(problem.confidence)}20`
                                                    }}
                                                >
                                                    {getConfidenceText(problem.confidence)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => deleteProblem(problem.id)}
                                                    className="text-zinc-500 hover:text-red-500 hover:bg-red-500/10"
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
    }