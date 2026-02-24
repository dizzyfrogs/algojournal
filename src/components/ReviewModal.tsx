"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Problem } from "@/types";
import { calculateNextReview } from "@/lib/utils";

interface ReviewModalProps {
    problem: Problem | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSaveReview: (updatedProblem: Problem) => void;
}

export function ReviewModal({ problem, open, onOpenChange, onSaveReview }: ReviewModalProps) {
    const [newConfidence, setNewConfidence] = useState(problem?.confidence || 3);
    const [newNote, setNewNote] = useState("");

    const getConfidenceText = (val: number) => {
        const texts = ["Struggled", "Unsure", "Neutral", "Confident", "Mastered"];
        const index = Math.max(0, Math.min(val - 1, 4));
        return texts[index];
    };

    const getConfidenceColor = (val: number) => {
        const colors = ["#ef4444", "#f97316", "#eab308", "#84cc16", "#22c55e"];
        const index = Math.max(0, Math.min(val - 1, 4));
        return colors[index];
    };

    if (!problem) return null;

    const handleSubmit = () => {
        const today = new Date();
        const nextDate = calculateNextReview(newConfidence, today);
        
        const updatedProblem: Problem = {
            ...problem,
            confidence: newConfidence,
            nextReviewDate: nextDate,
            notes: newNote 
                ? `Update (${today.toLocaleDateString()}): ${newNote}${problem.notes ? `\n\n${problem.notes}` : ''}`
                : (problem.notes || '')
        };

        onSaveReview(updatedProblem);
        setNewNote("");
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[400px] bg-zinc-900 border-zinc-800 text-white">
                <DialogHeader>
                    <DialogTitle className="flex justify-between items-center">
                        Reviewing: {problem.name}
                    </DialogTitle>
                    <DialogDescription>
                        Update your confidence level and add any new insights about this problem.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-zinc-400">How confident were you?</span>
                            <span 
                                className="text-xs font-bold uppercase tracking-wider"
                                style={{ color: getConfidenceColor(newConfidence) }}
                            >
                                {getConfidenceText(newConfidence)}
                            </span>
                        </div>
                        <Slider
                            value={[newConfidence]}
                            onValueChange={(vals) => setNewConfidence(vals[0])}
                            max={5} min={1} step={1}
                            className="py-4"
                        />
                        <p className="text-[10px] text-zinc-500 italic">
                            Previously: {getConfidenceText(problem.confidence || 3)} ({problem.confidence || 3}/5)
                        </p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-zinc-400">Add any new insights?</label>
                        <Textarea
                            placeholder="e.g., Found a faster O(n) approach..."
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            className="bg-zinc-950 border-zinc-800 min-h-[80px]"
                        />
                    </div>

                    <Button onClick={handleSubmit} className="w-full">
                        Done
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}