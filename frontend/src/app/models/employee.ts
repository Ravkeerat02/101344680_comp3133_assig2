export class Employee {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    salary: number;
  
    constructor(
      id: string,
      firstName: string,
      lastName: string,
      email: string,
      gender: string,
      salary: number
    ) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.gender = gender;
      this.salary = salary;
    }
  }
  