import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private EMPLOYEES_QUERY = gql`
    query {
      employees {
        id
        firstName
        lastName
        email
        gender
        salary
      }
    }
  `;

  private ADD_EMPLOYEE_MUTATION = gql`
    mutation AddEmployee($input: EmployeeInput!) {
      addEmployee(input: $input) {
        id
        firstName
        lastName
        email
        gender
        salary
      }
    }
  `;

  constructor(private apollo: Apollo) {}

  getEmployees(): Observable<Employee[]> {
    return this.apollo
      .watchQuery<any>({
        query: this.EMPLOYEES_QUERY
      })
      .valueChanges.pipe(map(result => result.data.employees));
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.apollo
      .mutate<any>({
        mutation: this.ADD_EMPLOYEE_MUTATION,
        variables: {
          input: employee
        },
        update: (store, { data: { addEmployee } }) => {
          const data = store.readQuery<any>({
            query: this.EMPLOYEES_QUERY
          });
          data.employees.push(addEmployee);
          store.writeQuery({
            query: this.EMPLOYEES_QUERY,
            data
          });
        }
      })
      .pipe(map(result => result.data.addEmployee));
  }
}
