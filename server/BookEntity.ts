export interface BookEntity {
  id: string;
  author: string;
  title: string;
}

export const bookFields = `
  id: ID
  title: String
  author: String
`;
