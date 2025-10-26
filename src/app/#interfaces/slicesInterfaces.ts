export interface NavigationState {
    levels?: Level[];
    disciplines: string[];
}

export interface Level {
    position?: number; 
    key?: string; 
    choice?: string;
}