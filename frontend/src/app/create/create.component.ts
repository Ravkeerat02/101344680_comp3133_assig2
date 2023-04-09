import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm!: FormGroup;

  constructor(private fb: FormBuilder, private apollo: Apollo, private router: Router) { }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      salary: ['', Validators.required]
    });
  }

  onSubmit() {
    this.apollo.mutate({
      mutation: gql`
        mutation createEmployee($firstName: String!, $lastName: String!, $email: String!, $gender: String!, $salary: Float!) {
          createEmployee(firstName: $firstName, lastName: $lastName, email: $email, gender: $gender, salary: $salary) {
            id
            firstName
            lastName
            email
            gender
            salary
          }
        }
      `,
      variables: {
        firstName: this.createForm.value.firstName,
        lastName: this.createForm.value.lastName,
        email: this.createForm.value.email,
        gender: this.createForm.value.gender,
        salary: parseFloat(this.createForm.value.salary)
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
      this.router.navigate(['/list']);
    }, error => {
      console.log('there was an error sending the query', error);
    });
  }

}
