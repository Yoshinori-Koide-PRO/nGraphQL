import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { debounceTime, switchMap } from 'rxjs/operators';

import { BookEntity } from '../service/book';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'GraphQLBooks';
  books: Observable<Map<String, BookEntity>>;

  private searchTerms = new Subject<string>();

  constructor(private service: BookService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.books = this.searchTerms.pipe(
      debounceTime(300),
      switchMap((term: string) => this.service.searchBooks(term))
    );
  }

  add(author: string, title: string) {
    this.service.updateBook('', author, title).unsubscribe();
  }

  update(id: string, author: string, title: string) {
    this.service.updateBook(id, author, title).unsubscribe();
  }

  remove(id: string) {
    this.service.removeBook(id).unsubscribe();
  }
}
