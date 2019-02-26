import { Injectable } from '@angular/core';
import gql from 'graphql-tag';

import { BookEntity, bookFields } from './book';

const BOOKS_SUBSCRIPTION = gql`
  subscription bookChanged{
    bookChanged{
      ${bookFields}
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class BookSubscriber {
  subscribeUpdateBooks<T extends BookEntity[]>() {
    return {
      document: BOOKS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        const bookEntry = subscriptionData.data.bookChanged;
        if (bookEntry != null) {
          const books = prev.books as T;
          const targets = books.filter(e => e.id == bookEntry.id);
          if (targets.length == 0) {
            books.push(bookEntry);
          } else {
            delete books[books.indexOf(targets[0])];
          }
          return prev;
        } else {
          console.error('called updateQuery but bookChanged is null...');
        }
      }
    };
  }
}
