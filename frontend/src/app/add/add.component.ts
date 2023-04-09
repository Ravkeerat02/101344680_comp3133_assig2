import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  addForm!: FormGroup;

  constructor(private fb: FormBuilder, private apollo: Apollo) {
    this.createForm();
  }

  createForm() {
    this.addForm = this.fb.group({
      id: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      salary: ['', Validators.required],
    });
  }

  onSubmit() {
    this.apollo.mutate({
      mutation: gql`
        mutation addEmployee($input: EmployeeInput!) {
          addEmployee(input: $input) {
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
        input: this.addForm.value
      }
    }).subscribe((result) => {
      const data = result.data as { addEmployee: Employee };
      const addedEmployee = data.addEmployee;
      console.log('Added employee:', addedEmployee);
    }, (error) => {
      console.error('Error adding employee:', error);
    });
  }
    
}
