import { BookEntity } from './BookEntity';

const crypto = require('crypto');

export const Books: BookEntity[] = [
  {
    id: 'Harry Potter and the Sorcerers stoneJ.K. Rowling',
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling'
  },
  {
    id: 'Jurassic ParkMichael Crichton',
    title: 'Jurassic Park',
    author: 'Michael Crichton'
  }
];

export const BookStrageEngine = {
  assignId(e: BookEntity) {
    const hash = crypto.createHash('sha256');
    hash.write(e.title + e.author);
    e.id = hash.digest('hex');
    hash.end();
    return e;
  },
  get(id: string) {
    const targets = Books.filter(b => b.id == id);
    return targets.length > 0 ? targets[0] : null;
  }
};
