import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Apollo, ApolloModule } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { AppComponent } from './app.component';
import { Route , RouterModule } from '@angular/router';

import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    CreateComponent,
    EditComponent,
    ListComponent,
    AddComponent
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
