import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-employee-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  filteredEmployees: any[] = [];
  searchTerm = '';
  designation = '';
  department = '';
  error = '';

  constructor(private empService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.empService.getAll().subscribe({
      next: (data) => {
        this.employees = data;
        this.filteredEmployees = data;
      },
      error: (err) => this.error = err.message
    });
  }

  deleteEmployee(id: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.empService.delete(id).subscribe({
        next: () => this.loadEmployees(),
        error: (err) => alert(err.message)
      });
    }
  }

  search() {
    this.empService.search(this.designation, this.department).subscribe({
      next: (result: any) => {
        this.filteredEmployees = result.data.searchEmployeeByDesignationOrDepartment;
      },
      error: (err) => this.error = err.message
    });
  }

  clearSearch() {
    this.designation = '';
    this.department = '';
    this.filteredEmployees = this.employees;
  }

  viewDetails(id: string) {
    this.router.navigate(['/employees', id]);
  }

  editEmployee(id: string) {
    this.router.navigate(['/employees/edit', id]);
  }

  addEmployee() {
    this.router.navigate(['/employees/add']);
  }
}
