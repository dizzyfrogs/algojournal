import { DifficultyBadge } from "@/components/DifficultyBadge";

export default function Home() {
  return (
    <main className="min-h-screen p-10 bg-zinc-950 text-white">
      <h1 className="text-2xl font-bold mb-6">Component Test: Difficulty Badge</h1>
      <div className="flex gap-4">
        <DifficultyBadge type="Easy" />
        <DifficultyBadge type="Medium" />
        <DifficultyBadge type="Hard" />
      </div>
    </main>
  );
}