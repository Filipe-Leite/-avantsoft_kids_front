export interface NavigationState {
    levels?: Level[];
    disciplines: Discipline[];
    topics: Topic[];
    subtopics: Subtopic[];
    disciplinesSearch: Discipline[];
    topicsSearch: Topic[];
    subtopicsSearch: Topic[];
    errors: string[];
    loadingDisciplines: boolean;
    loadingTopics: boolean;
    loadingSubtopics: boolean;
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

export interface Subtopic {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}