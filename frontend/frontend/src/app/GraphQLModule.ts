import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {ApolloModule, Apollo} from 'apollo-angular';
// import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import { HttpLink } from "apollo-angular/http";
import {InMemoryCache} from 'apollo-cache-inmemory';

const uri = 'http://localhost:5000/graphql'; // <-- add the URL of the GraphQL server here

@NgModule({
    exports: [],
    imports: [
        HttpClientModule,
        ApolloModule,
        // HttpLinkModule
    ],
})
    export class GraphQLModule {
        constructor({ apollo, httpLink }: { apollo: Apollo; httpLink: HttpLink; }) {
            apollo.create({
                link: httpLink.create({uri}),
                cache: new InMemoryCache()
            });
        }
    }