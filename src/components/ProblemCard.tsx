import { Problem } from "@/types";
import { DifficultyBadge } from "./DifficultyBadge";
import { Calendar, Tag } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

interface ProblemCardProps {
    problem: Problem;
}

export function ProblemCard({ problem }: ProblemCardProps) {
    return (
        <Card className="bg-zinc-900 border-zinc-800 transition-all hover:border-zinc-700 shadow-md">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="space-y-1">
                    <CardTitle className="text-xl font-bold text-white">{problem.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 text-zinc-500">
                        <Calendar size={14} />
                        {new Date(problem.dateSolved).toLocaleDateString()}
                    </CardDescription>
                </div>
                <DifficultyBadge type={problem.difficulty} />
            </CardHeader>
            <CardContent>
                <p className="text-sm text-zinc-400 line-clamp-2 mb-4">
                    {problem.notes || "Add your approach notes here..."}
                </p>
                {problem.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {problem.tags.map(tag => (
                            <div key={tag} className="flex items-center gap-1 text-[10px] bg-zinc-800 px-2 py-0.5 rounded text-zinc-300 border border-zinc-700">
                                <Tag size={10} />
                                {tag}
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}