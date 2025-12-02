export interface User {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  streak: number;
  xp: number;
  gems: number;
  hearts: number;
  level: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  xp: number;
  isCompleted: boolean;
  isLocked: boolean;
  position: number;
}

export interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  username: string;
  avatar?: string;
  xp: number;
  isCurrentUser?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  progress: number;
  total: number;
}

