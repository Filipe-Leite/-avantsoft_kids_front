export interface NavigationState {
    levels: Level[];
    disciplines: Discipline[];
    disciplinesSearch: Discipline[];
    topics: Topic[];
    topicsSearch: Topic[];
    subtopics: Subtopic[];
    subtopicsSearch: Topic[];
    authors: Author[];
    authorsSearch: Author[];
    sources: Source[];
    sourcesSearch: Source[];
    errors: string[];
    loadingDisciplines: boolean;
    loadingTopics: boolean;
    loadingSubtopics: boolean;
    loadingAuthors: boolean;
    loadingSources: boolean;
}

export interface Level {
    position?: number; 
    key?: string; 
    choice?: string;
    id?: number;
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

export interface Author {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Source {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface Card {
  subject: string;
  quote: string;
  cardType: number;
  comment: string;
  edition: string;
  city: string;
  year: Date;
  internetAccessDate: Date;
  internetAccessLink: string;
  userId: number;
  resourceId: number;
  authorId: number;
  createdAt?: Date;
  updatedAt?: Date;
}