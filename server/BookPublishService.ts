import { PubSub } from 'graphql-subscriptions';
import { BookRepository } from './BookRepository';
import { BookEntity } from './BookEntity';

export const BOOK_INSERT = 'book_event_success_inserted';
export const BOOK_DELETE = 'book_event_success_deleted';
export const pubsub = new PubSub();
export class BookServiceWithPub {
  repo = new BookRepository();

  update(entity: BookEntity) {
    const ret = this.repo.change(entity);
    pubsub.publish(BOOK_INSERT, { bookChanged: ret });
    return ret;
  }

  findByAuthor(author) {
    return this.repo.findByAuthor(author);
  }

  delete(entity: BookEntity) {
    const ret = this.repo.delete(entity);
    pubsub.publish(BOOK_DELETE, { bookChanged: ret });
    return ret;
  }
}
