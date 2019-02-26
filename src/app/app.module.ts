import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { BookService } from '../service/book.service';
import { ApolloLink } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { BookSubscriber } from 'src/service/book.subscriber';

interface DefinintionNode {
  kind: string;
  operation?: string;
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ],
  providers: [BookService, BookSubscriber],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    const endpoint = `${window.location.hostname}:4000/graphql`;
    const http = httpLink.create({
      uri: `http://${endpoint}`
    }) as ApolloLink;
    const wsLink = new WebSocketLink({
      uri: `ws://${endpoint}`,
      options: {
        reconnect: true
      }
    });
    // using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    const link = split(
      // split based on operation type
      ({ query }) => {
        const { kind, operation }: DefinintionNode = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      wsLink,
      http
    );

    const cache = new InMemoryCache();

    apollo.create({ link, cache });
  }
}
