import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  standalone: true,
  selector: 'app-employee-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {
  form: FormGroup;
  id: string = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private empService: EmployeeService
  ) {
    this.form = this.fb.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      designation: [''],
      salary: [0],
      department: ['']
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.empService.getById(this.id).subscribe({
      next: (res: any) => {
        this.form.patchValue(res.data.searchEmployeeById);
      },
      error: (err) => this.error = err.message
    });
  }

  onSubmit() {
    this.empService.update(this.id, this.form.value).subscribe({
      next: () => this.router.navigate(['/employees']),
      error: (err) => this.error = err.message
    });
  }
}
