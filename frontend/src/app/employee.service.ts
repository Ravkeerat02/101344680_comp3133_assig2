import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from './models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private apollo: Apollo) {}

  getEmployees(): Observable<Employee[]> {
    return this.apollo
      .watchQuery<any>({
        query: gql`
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
        `
      })
      .valueChanges.pipe(map(result => result.data.employees));
  }
}
