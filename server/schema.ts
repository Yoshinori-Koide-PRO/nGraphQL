import { gql } from 'apollo-server-express';
import { bookFields } from './BookEntity';

export const TypeDefs = gql`
  type Query {
    books(author: String): [Book]
  }
  type Mutation {
    book(item: BookEntry!): Book
    removeBook(item: BookEntry!): Book
  }
  type Subscription {
    bookChanged: Book
  }
  type Book {
    ${bookFields}
  }
  input BookEntry {
    ${bookFields}
  }
`;
