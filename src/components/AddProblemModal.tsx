"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
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
import { Difficulty } from "@/types";

export function AddProblemModal() {
    const [name, setName] = useState("");
    const [difficulty, setDifficulty] = useState<Difficulty>("Medium");
    const [notes, setNotes] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // log for now, will implement actual logic later
        console.log({ 
            name, 
            difficulty, 
            notes, 
            dateSolved: new Date().toISOString(), 
            tags: [] // handle tags later 
        });

        setName("");
        setNotes("");
    };

    return (
        <Dialog>
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