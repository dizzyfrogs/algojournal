export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Problem {
    id: string;
    name: string;
    difficulty: Difficulty;
    dateSolved: string;
    nextReviewDate: string;
    notes: string;
    confidence: number;
    tags: string[];
}