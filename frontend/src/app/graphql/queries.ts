import { gql } from 'apollo-angular';

export const LOGIN = gql`
  query Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }
`;

// Already included LOGIN, SIGNUP before

export const GET_ALL_EMPLOYEES = gql`
  query {
    getAllEmployees {
      id
      first_name
      last_name
      email
      department
      designation
      salary
    }
  }
`;

export const SEARCH_EMPLOYEE_BY_ID = gql`
  query($eid: ID!) {
    searchEmployeeById(eid: $eid) {
      id
      first_name
      last_name
      email
      gender
      designation
      salary
      department
      date_of_joining
      employee_photo
    }
  }
`;

export const SEARCH_EMPLOYEE_BY_FILTER = gql`
  query($designation: String, $department: String) {
    searchEmployeeByDesignationOrDepartment(designation: $designation, department: $department) {
      id
      first_name
      last_name
      email
      designation
      department
      salary
    }
  }
`;


