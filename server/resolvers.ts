import {
  BookServiceWithPub,
  pubsub,
  BOOK_INSERT,
  BOOK_DELETE
} from './BookPublishService';

const bookService = new BookServiceWithPub();

export const resolvers = {
  Query: {
    books: (obj, args, context, info) => {
      return bookService.findByAuthor(args.author);
    }
  },
  Mutation: {
    book: (obj, args, context, info) => {
      return bookService.update(args.item);
    },
    removeBook: (obj, args, context, info) => {
      return bookService.delete(args.item);
    }
  },
  Subscription: {
    bookChanged: {
      subscribe: () => pubsub.asyncIterator([BOOK_INSERT, BOOK_DELETE])
    }
  }
};
