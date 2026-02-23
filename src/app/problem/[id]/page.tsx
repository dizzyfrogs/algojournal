"use client";

import { Button } from "@/components/ui/button";
import { Problem } from "@/types";
import { ArrowLeft } from "lucide-react";
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
      <div className="max-w-3x1 mx-auto py-10 px-6 animate-in fade-in duration-500">
        <Button
            variant="ghost"
            className="mb-8 text-zinc-400 hover:text-white gap-2"
            onClick={() => router.back()}    
        >
            <ArrowLeft size={16} /> Back to Dashboard
        </Button>
      </div>  
    );
}