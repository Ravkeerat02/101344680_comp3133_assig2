import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee';
import { EmployeeService } from '../employee.service';
import {MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  employees : any[] = [];
  router: any;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  viewEmployee(id: string) {
    this.router.navigate(['/view', id]);
  }

  editEmployee(id: string) {
    this.router.navigate(['/edit', id]);
  }
  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id).subscribe(data => {
      this.getEmployees();
    });
  }
}
