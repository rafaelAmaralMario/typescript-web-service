import { IPost } from "../post/interface";

export interface IAuthor {
  readonly id: number;
  name: String;
  Posts?: IPost[];
}

export function createAuthor({ id, name, Posts }: any): IAuthor {
  return {
    id,
    name,
    Posts,
  };
}

export function createAuthors(data: any[]): IAuthor[] {
  return data.map(createAuthor);
}
