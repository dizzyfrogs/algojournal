import { ProblemCard } from "@/components/ProblemCard";
import { Problem } from "@/types";

const MOCK_PROBLEMS: Problem[] = [
  {
    id: "1",
    name: "Two Sum",
    difficulty: "Easy",
    dateSolved: new Date().toISOString(),
    notes: "Used a Hash Map for O(n) time complexity. Crucial to remember the complement logic.",
    confidence: 5,
    tags: ["Array", "Hash Map"],
  },
  {
    id: "2",
    name: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    dateSolved: new Date().toISOString(),
    notes: "Sliding window approach. Need to be careful with the left pointer update.",
    confidence: 3,
    tags: ["String", "Sliding Window"],
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-zinc-400 mt-2">Welcome back! Here is your recent DSA progress.</p>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-zinc-200">Recent Solves</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_PROBLEMS.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} />
          ))}
        </div>
      </section>
    </div>
  );
}