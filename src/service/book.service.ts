import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { BookEntity, bookFields } from './book';
import { BookSubscriber } from './book.subscriber';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private apollo: Apollo, private bookSubs: BookSubscriber) {}

  searchBooks(term: String): Observable<Map<String, BookEntity>> {
    if (!term.trim()) {
      term = '*';
    }
    const queryRef = this.apollo.watchQuery<any>({
      query: gql`{
          books(author:"${term}"){
            ${bookFields}
          }
        }`
    });
    // 追加でSubScribe
    queryRef.subscribeToMore(this.bookSubs.subscribeUpdateBooks());

    return queryRef.valueChanges.pipe(
      map(
        result =>
          result.data.books.reduce((m, o) => {
            m[o.id] = o;
            return m;
          }, {}) as Map<String, BookEntity>
      )
    );
  }

  updateBook(id: string, author: string, title: string) {
    return this.apollo
      .mutate({
        mutation: gql`
          mutation CreateBook($book: BookEntry!) {
            book(item: $book) {
              ${bookFields}
            }
          }
        `,
        variables: {
          book: {
            id: id,
            author: author,
            title: title
          }
        }
      })
      .subscribe(() => {
        this.apollo.getClient().cache.reset();
      });
  }

  removeBook(id: string) {
    return this.apollo
      .mutate({
        mutation: gql`
          mutation RemoveBook($book: BookEntry!) {
            removeBook(item: $book) {
              ${bookFields}
            }
          }
        `,
        variables: {
          book: {
            id: id,
            author: '',
            title: ''
          }
        }
      })
      .subscribe(() => {
        this.apollo.getClient().cache.reset();
      });
  }
}
