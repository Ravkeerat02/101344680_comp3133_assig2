import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Apollo, ApolloModule } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { AppComponent } from './app.component';
import { Route , RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    RouterModule, 
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo) {
    apollo.create({
      uri: 'https://backendopx.herokuapp.com/graphql',
      cache: new InMemoryCache()
    });
  }
}
