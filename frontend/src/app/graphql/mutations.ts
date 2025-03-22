import { gql } from 'apollo-angular';

export const ADD_EMPLOYEE = gql`
  mutation AddEmployee(
    $first_name: String!, $last_name: String!, $email: String!, $gender: String!,
    $designation: String!, $salary: Float!, $date_of_joining: String!,
    $department: String!, $employee_photo: String
  ) {
    addEmployee(
      first_name: $first_name, last_name: $last_name, email: $email, gender: $gender,
      designation: $designation, salary: $salary, date_of_joining: $date_of_joining,
      department: $department, employee_photo: $employee_photo
    ) {
      id
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $eid: ID!, $first_name: String, $last_name: String,
    $email: String, $designation: String, $salary: Float, $department: String
  ) {
    updateEmployee(
      eid: $eid,
      first_name: $first_name,
      last_name: $last_name,
      email: $email,
      designation: $designation,
      salary: $salary,
      department: $department
    ) {
      id
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($eid: ID!) {
    deleteEmployee(eid: $eid)
  }
`;
