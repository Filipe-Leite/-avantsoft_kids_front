
export interface AuthHeaders {
    'accept'?: string;
    'access-token'?: string;
    'client'?: string;
    'uid'?: string;
}

export interface NewAuthor {
  id?: number;
  name: string;
  reference: string;
}