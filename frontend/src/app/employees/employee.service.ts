import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
    GET_ALL_EMPLOYEES,
    SEARCH_EMPLOYEE_BY_ID,
    SEARCH_EMPLOYEE_BY_FILTER
  } from '../graphql/queries';
  
  import {
    ADD_EMPLOYEE,
    UPDATE_EMPLOYEE,
    DELETE_EMPLOYEE
  } from '../graphql/mutations';
  
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  constructor(private apollo: Apollo) {}

  getAll() {
    return this.apollo.watchQuery({ query: GET_ALL_EMPLOYEES }).valueChanges.pipe(
      map((result: any) => result.data.getAllEmployees)
    );
  }

  getById(id: string) {
    return this.apollo.query({
      query: SEARCH_EMPLOYEE_BY_ID,
      variables: { eid: id },
      fetchPolicy: 'no-cache'
    });
  }

  search(designation: string, department: string) {
    return this.apollo.query({
      query: SEARCH_EMPLOYEE_BY_FILTER,
      variables: { designation, department }
    });
  }

  add(employee: any) {
    return this.apollo.mutate({
      mutation: ADD_EMPLOYEE,
      variables: employee
    });
  }

  update(id: string, updates: any) {
    return this.apollo.mutate({
      mutation: UPDATE_EMPLOYEE,
      variables: { eid: id, ...updates }
    });
  }

  delete(id: string) {
    return this.apollo.mutate({
      mutation: DELETE_EMPLOYEE,
      variables: { eid: id }
    });
  }
}
