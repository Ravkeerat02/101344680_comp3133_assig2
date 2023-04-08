import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache, ApolloCache } from '@apollo/client/core';

const uri = 'http://localhost:5000/graphql'; // <-- add the URL of the GraphQL server here

@NgModule({
  exports: [],
  imports: [HttpClientModule, ApolloModule],
})
export class GraphQLModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({ uri }),
      cache: new InMemoryCache() as ApolloCache<unknown>,
    });
  }
}
