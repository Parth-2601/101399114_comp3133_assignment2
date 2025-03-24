import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'; 
import { EmployeeService } from '../employee.service';

@Component({
  standalone: true,
  selector: 'app-employee-detail',
  imports: [CommonModule],
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  employee: any = null;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private empService: EmployeeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.empService.getById(id).subscribe({
      next: (res: any) => {
        this.employee = res.data.searchEmployeeById;
      },
      error: (err) => this.error = err.message
    });
  }

  goBack(): void {
    this.router.navigate(['/employees']);
  }
}
