"use client";

import { useState, useEffect } from "react";

import { ProblemCard } from "@/components/ProblemCard";
import { AddProblemModal } from "@/components/AddProblemModal";
import { Problem } from "@/types";

export default function Home() {

  const [problems, setProblems] = useState<Problem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("problems");
    if (stored) {
      setProblems(JSON.parse(stored));
    }
  }, []);

  const addProblem = (problem: Problem) => {
    const updated = [problem, ...problems];
    setProblems(updated);
    localStorage.setItem("problems", JSON.stringify(updated));
  };

  const deleteProblem =  (id: string) => { 
    const updated = problems.filter(p => p.id !== id);
    setProblems(updated);
    localStorage.setItem("problems", JSON.stringify(updated));
  };

  

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-zinc-400 mt-2">Welcome back! Here is your recent DSA progress.</p>
        </div>
        <AddProblemModal onAddProblem={addProblem} />
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-zinc-200">Recent Solves</h2>

        {problems.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-zinc-800 rounded-xl">
            <p className="text-zinc-500">No problems logged yet. Click "Log Problem" to start.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((problem) => (
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