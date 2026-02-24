"use client";

import { useState } from "react";
import { PlusCircle, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Difficulty, Problem } from "@/types";
import { calculateNextReview } from "@/lib/utils";

interface AddProblemModalProps {
    onAddProblem: (problem: Problem) => void;
}

const FEATURED_TAGS = ["Array", "String", "Hash Table", "DP", "DFS", "BFS"];

const ALL_TAGS = [
    ...FEATURED_TAGS,
    "Sorting", "Math", "Two Pointers", "Tree", "Binary Search", 
    "Binary Tree", "Matrix", "Greedy", "Stack", "Design", "Heap", 
    "Linked List", "Sliding Window", "Backtracking", "Bit Manipulation", 
    "Prefix Sum", "Union Find", "Counting", "Graph Theory", "Simulation", 
    "BST", "Recursion", "Divide and Conquer", "Trie", "Queue", 
    "Topological Sort", "Monotonic Stack", "Shortest Path"
];

export function AddProblemModal({ onAddProblem }: AddProblemModalProps) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [difficulty, setDifficulty] = useState<Difficulty>("Medium");
    const [notes, setNotes] = useState("");
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [confidence, setConfidence] = useState<number>(3);
    const [showAllTags, setShowAllTags] = useState(false);
    const [dateSolved, setDateSolved] = useState(new Date().toISOString().split("T")[0]);

    const displayedTags = showAllTags ? ALL_TAGS : FEATURED_TAGS;

    const getConfidenceText = (val: number) => {
        const texts = ["Struggled", "Unsure", "Neutral", "Confident", "Mastered"];
        return texts[val - 1];
    };

    const getConfidenceColor = (val: number) => {
        const colors = ["#ef4444", "#f97316", "#eab308", "#84cc16", "#22c55e"];
        return colors[val - 1];
    };

    const toggleTag = (tag: string) => {
        setTags(prev => 
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && tagInput.trim()) {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput("");
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleSubmit = (e: React.FormEvent) => {
        const actualSolveDate = new Date(dateSolved);
        const nextReview = calculateNextReview(confidence, actualSolveDate);

        e.preventDefault();
        onAddProblem({
            id: crypto.randomUUID(),
            name,
            difficulty,
            notes,
            dateSolved: actualSolveDate.toISOString(),
            nextReviewDate: nextReview,
            confidence,
            tags
        });
        setName("");
        setNotes("");
        setTags([]);
        setTagInput("");
        setConfidence(3);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <PlusCircle size={18} />
                    Log Problem
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-zinc-800 text-white">
                <DialogHeader>
                    <DialogTitle>Log New Problem</DialogTitle>
                    <DialogDescription className="text-zinc-400">
                        Add details about the problem you solved.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <label htmlFor="name" className="text-sm font-medium">Problem Name</label>
                        <Input
                            id="name"
                            placeholder="e.g. Two Sum"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-zinc-950 border-zinc-800 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Difficulty</label>
                        <div className="flex gap-2">
                            {(["Easy", "Medium", "Hard"] as Difficulty[]).map((level) => (
                                <Button
                                    key={level}
                                    type="button"
                                    variant={difficulty === level ? "default" : "outline"}
                                    onClick={() => setDifficulty(level)}
                                    className="flex-1"
                                >
                                    {level}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-4 py-2">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium flex items-center gap-2">
                                Confidence
                            </label>
                            <span 
                                className="text-xs font-bold uppercase tracking-wider"
                                style={{ color: getConfidenceColor(confidence) }}
                            >
                                {getConfidenceText(confidence)}
                            </span>
                        </div>
                        <Slider
                            value={[confidence]}
                            onValueChange={(vals) => setConfidence(vals[0])}
                            max={5}
                            min={1}
                            step={1}
                            className="py-4"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Tags</label>
                        <div className="flex flex-wrap gap-2 max-h-[120px] overflow-y-auto pr-1">
                            {displayedTags.map((tag) => {
                                const isSelected = tags.includes(tag);
                                return (
                                    <Badge 
                                        key={tag} 
                                        variant={isSelected ? "default" : "outline"}
                                        className={`cursor-pointer py-1 ${isSelected ? "bg-blue-600 hover:bg-blue-700" : "border-zinc-700 text-zinc-400"}`}
                                        onClick={() => toggleTag(tag)}
                                    >
                                        {tag}
                                    </Badge>
                                );
                            })}
                            {tags.filter(t => !ALL_TAGS.includes(t)).map((tag) => (
                                <Badge key={tag} variant="secondary" className="gap-1 bg-zinc-800 text-zinc-200 py-1">
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); removeTag(tag); }}
                                        className="ml-1 rounded-full outline-none hover:bg-zinc-700 p-0.5"
                                    >
                                        <X size={12} className="text-zinc-400 hover:text-red-400" />
                                    </button>
                                </Badge>
                            ))}
                        </div>
                        <div className="flex justify-start">
                            <button 
                                type="button" 
                                onClick={() => setShowAllTags(!showAllTags)}
                                className="text-xs text-blue-400 hover:underline pt-1"
                            >
                                {showAllTags ? "Show Featured" : `+ ${ALL_TAGS.length - FEATURED_TAGS.length} more`}
                            </button>
                        </div>
                        <Input
                            placeholder="Add custom pattern..."
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleAddTag}
                            className="bg-zinc-950 border-zinc-800 h-9 text-xs"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="notes" className="text-sm font-medium">Notes</label>
                        <Textarea
                            id="notes"
                            placeholder="What was the key insight?"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="bg-zinc-950 border-zinc-800 min-h-[100px] focus:ring-blue-500"
                        />
                    </div>

                    <DialogFooter>
                        <Button type="submit" className="w-full">Save Problem</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}