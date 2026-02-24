import { cn } from '@/lib/utils';
import { Difficulty } from '@/types';

interface BadgeProps {
    type: Difficulty;
    className?: string;
}

export function DifficultyBadge({ type, className }: BadgeProps) {
    const styles = {
        Easy: "bg-green-500/10 text-green-500 border-green-500/20",
        Medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        Hard: "bg-red-500/10 text-red-500 border-red-500/20",
    };

    return (
        <span className={cn(
            "px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-colors",
            styles[type],
            className
        )}>
            {type}
        </span>
    );
}