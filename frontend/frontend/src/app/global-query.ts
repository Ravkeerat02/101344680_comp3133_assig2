'use strict'; 

import gql from 'graphql-tag';


export const addUser = gql`
    mutation addUser($name: String!, $email: String!, $password: String!) {
        addUser(name: $name, email: $email, password: $password) {
            name
            password
            email
        }
    }
`;

export const removeUser = gql`
    mutation removeUser($id: ID!) {
        removeUser(id: $id) {
            id
            name
        }
    }
`;

export const editUser = gql`
    mutation updateUser( $name: String!, $email: String!,  ) {
        updateUser( name: $name, email: $email, ) {
            name
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