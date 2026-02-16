import { DifficultyBadge } from "@/components/DifficultyBadge";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p className="text-zinc-400 mb-8">Welcome to your DSA companion.</p>
      
      <div className="flex gap-4">
        <DifficultyBadge type="Easy" />
        <DifficultyBadge type="Medium" />
        <DifficultyBadge type="Hard" />
      </div>
    </div>
  );
}