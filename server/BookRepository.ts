import { BookEntity } from './BookEntity';
import { Books, BookStrageEngine } from './BookStorage';

export class BookRepository {
  change(entry: BookEntity) {
    const id = entry.id;
    if (id == null) return this.create(entry);
    const target = BookStrageEngine.get(id);
    if (target == null) {
      return this.create(entry);
    } else {
      const t = target;
      t.author = entry.author;
      t.title = entry.title;
      return t;
    }
  }

  create(entry: BookEntity) {
    Books.push(BookStrageEngine.assignId(entry));
    return entry;
  }

  findByAuthor(author) {
    return Books.filter(
      book => author == '*' || book.author.startsWith(author)
    );
  }

  delete(entry: BookEntity) {
    const targets = BookStrageEngine.get(entry.id);
    if (targets != null) {
      const e = targets[0] as BookEntity;
      // idで比較
      const index = Books.map(e => e.id).indexOf(e.id);
      const retVal = Books[index];
      delete Books[index];
      return retVal;
    } else {
      throw 'Not Found!!';
    }
  }
}
