'use strict'; 

import gql from 'graphql-tag';

export const createUser = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(usernamename: $name, email: $email, password: $password) {
            username
            password
            email
        }
    }
`;
export const Users = gql`
    query Users {
        users {
            username
            password
            email
        }
    }
`;

export const createEmployee = gql`
    mutation createEmployee($name: String!, $email: String!, $password: String!) {
        createEmployee(name: $name, email: $email, password: $password) {
            name
            password
            email
        }
    }
`;

export const removeEmployee = gql`
    mutation removeEmployee($id: ID!) {
        removeEmployee(id: $id) {
            id
        }
    }
`;