import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateNextReview(confidence: number, fromDate: Date = new Date()): string {
  const intervals: Record<number, number> = {
    1: 1, //strugled, review next day
    2: 2, //kinda knew, review in 2 days
    3: 4, //knew, review in 4
    4: 7, //easy, review in 1 week
    5: 14, //very easy, review in 2 weeks
  };

  const nextDate = new Date(fromDate);
  nextDate.setDate(nextDate.getDate() + (intervals[confidence] || 1));
  return nextDate.toISOString();
}