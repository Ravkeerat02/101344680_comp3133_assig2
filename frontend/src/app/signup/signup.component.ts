import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { FormBuilder, Validators } from '@angular/forms';
import gql from 'graphql-tag';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  formData = {
    email: '',
    password: ''
  };

  constructor(private apollo: Apollo, private router: Router, private fb: FormBuilder) {}

  onSubmit() {
    this.apollo.mutate({
      mutation: gql`
        mutation signup($email: String!, $password: String!) {
          signup(email: $email, password: $password) {
            id
            email
          }
        }
      `,
      variables: {
        email: this.formData.email,
        password: this.formData.password
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
      this.router.navigate(['/login']);
    }, error => {
      console.log('there was an error sending the query', error);
    });
  }

  gotoLogin() {
    this.router.navigate(['/login']);
  }
}
