"use client";

import { useState } from "react";
import { PlusCircle, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

interface AddProblemModalProps {
    onAddProblem: (problem: Problem) => void;
}

export function AddProblemModal({ onAddProblem }: AddProblemModalProps) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [difficulty, setDifficulty] = useState<Difficulty>("Medium");
    const [notes, setNotes] = useState("");
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState<string[]>([]);

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
        e.preventDefault();

        const newProblem: Problem = {
            id: crypto.randomUUID(),
            name,
            difficulty,
            notes,
            dateSolved: new Date().toISOString(),
            confidence: 3,
            tags: tags
        };

        onAddProblem(newProblem);
        
        setName("");
        setNotes("");
        setTags([]);
        setTagInput("");
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
                        Add details about the problem you solved, your approach, and anything else you want to remember. This will be added to your journal.
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

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Tags</label>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <Badge 
                                    key={tag} 
                                    variant="secondary" 
                                    className="gap-1 bg-zinc-800 text-zinc-200 py-1"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            removeTag(tag);
                                        }}
                                        className="ml-1 rounded-full outline-none hover:bg-zinc-700 p-0.5 transition-colors"
                                    >
                                        <X size={12} className="text-zinc-400 hover:text-red-400" />
                                    </button>
                                </Badge>
                            ))}
                        </div>
                        <Input
                            placeholder="Type tag and press Enter"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleAddTag}
                            className="bg-zinc-950 border-zinc-800"
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