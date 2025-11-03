export interface NavigationState {
    levels?: Level[];
    disciplines: Discipline[];
    topics: Topic[];
    disciplinesSearch: Discipline[];
    topicsSearch: Topic[];
    errors: string[];
    loadingDisciplines: boolean;
    loadingTopics: boolean;
}

export interface Level {
    position?: number; 
    key?: string; 
    choice?: string;
}

export interface Discipline {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Topic {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}