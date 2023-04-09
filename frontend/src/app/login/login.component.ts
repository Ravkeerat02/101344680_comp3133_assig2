import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import {FormGroup , FormControl, Validators} from '@angular/forms';
import gql from 'graphql-tag';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  
  constructor(private router: Router, private apollo: Apollo) { }

  async login() {
    const { username, password } = this.loginForm.value;
    try {
      const response = await this.apollo.query({
        query: gql`
          query {
            login(username: "${username}", password: "${password}") {
              // Specify the fields you want to retrieve here
            }
          }
        `
      }).toPromise();
      
      if (response && response.data) {
        console.log(response.data);
        // Access the data here
      }
    } catch (error) {
      console.log(error);
    }
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
  
}
