import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { ApolloModule, Apollo } from 'apollo-angular';
import * as apolloAngularLinkHttp from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    apolloAngularLinkHttp.HttpLinkModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  declarations: [
    LoginComponent,
    SignupComponent
  ]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: apolloAngularLinkHttp.HttpLink) {
    apollo.create({
      link: httpLink.create({uri: 'backendopx.herokuapp.com/graphql'}),
      cache: new InMemoryCache()
    });
  }
}
