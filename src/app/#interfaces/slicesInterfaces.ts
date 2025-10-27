export interface NavigationState {
    levels?: Level[];
    disciplines: Discipline[];
    errors: string[];
    loadingDisciplines: boolean;
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