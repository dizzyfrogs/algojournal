import { Problem } from "@/types";
import { DifficultyBadge } from "./DifficultyBadge";
import { Calendar, Tag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

interface ProblemCardProps {
  problem: Problem;
  onDelete: (id: string) => void;
}

export function ProblemCard({ problem, onDelete }: ProblemCardProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 transition-all hover:border-zinc-700 shadow-md group">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold text-white pr-2">
            {problem.name}
          </CardTitle>
          <CardDescription className="flex items-center gap-2 text-zinc-500">
            <Calendar size={14} />
            {new Date(problem.dateSolved).toLocaleDateString()}
          </CardDescription>
        </div>
        
        <div className="flex items-center gap-2">
          <DifficultyBadge type={problem.difficulty} />
          
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => onDelete(problem.id)}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-zinc-400 line-clamp-2 mb-4">
          {problem.notes || "No notes provided."}
        </p>
        
        {problem.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {problem.tags.map((tag) => (
              <div 
                key={tag} 
                className="flex items-center gap-1 text-[10px] bg-zinc-800 px-2 py-0.5 rounded text-zinc-300 border border-zinc-700"
              >
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