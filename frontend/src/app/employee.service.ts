import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ApolloError } from '@apollo/client/core';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Employee } from './models/employee';

interface EmployeesQueryResult {
  employees: Employee[];
}

interface EmployeeQueryResult {
  employee: Employee;
}

interface CreateEmployeeMutationResult {
  createEmployee: Employee;
}

interface UpdateEmployeeMutationResult {
  updateEmployee: Employee;
}

interface DeleteEmployeeMutationResult {
  deleteEmployee: Employee;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private apollo: Apollo) {}

  getEmployees(): Observable<Employee[]> {
    return this.apollo
      .watchQuery<EmployeesQueryResult>({
        query: gql`
          {
            employees {
              id
              firstName
              lastName
              email
            }
          }
        `,
      })
      .valueChanges.pipe(map((result) => result.data.employees));
  }

  getEmployee(id: string): Observable<Employee> {
    return this.apollo
      .watchQuery<EmployeeQueryResult>({
        query: gql`
          query GetEmployee($id: ID!) {
            employee(id: $id) {
              id
              firstName
              lastName
              email
            }
          }
        `,
        variables: {
          id,
        },
      })
      .valueChanges.pipe(map((result) => result.data.employee));
  }

  addEmployee(firstName: string, lastName: string, email: string): Observable<Employee> {
    return this.apollo
      .mutate<CreateEmployeeMutationResult>({
        mutation: gql`
          mutation CreateEmployee($firstName: String!, $lastName: String!, $email: String!) {
            createEmployee(firstName: $firstName, lastName: $lastName, email: $email) {
              id
              firstName
              lastName
              email
            }
          }
        `,
        variables: {
          firstName,
          lastName,
          email,
        },
      })
      .pipe(
        map((result) => {
          if (result.data?.createEmployee) {
            return result.data.createEmployee;
          } else {
            throw new Error('Could not create employee');
          }
        }),
        catchError((error: ApolloError) => {
          console.error(error);
          throw error;
        })
      );
  }

  updateEmployee(id: string, firstName: string, lastName: string, email: string): Observable<Employee> {
    return this.apollo
      .mutate<UpdateEmployeeMutationResult>({
        mutation: gql`
          mutation UpdateEmployee($id: ID!, $firstName: String!, $lastName: String!, $email: String!) {
            updateEmployee(id: $id, firstName: $firstName, lastName: $lastName, email: $email) {
              id
              firstName
              lastName
              email
            }
          }
        `,
        variables: {
          id,
          firstName,
          lastName,
          email,
        },
      })
      .pipe(map((result) => result.data!.updateEmployee));
  }

  deleteEmployee(id: string): Observable<Employee> {
    return this.apollo
      .mutate<DeleteEmployeeMutationResult>({
        mutation: gql`
          mutation DeleteEmployee($id: ID!) {
            deleteEmployee(id: $id) {
              id
              firstName
              lastName
              email
            }
          }
        `,
        variables: {
          id,
        },
      })
      .pipe(map((result) => result.data!.deleteEmployee));
  }
}
