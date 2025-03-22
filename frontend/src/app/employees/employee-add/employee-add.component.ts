import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  standalone: true,
  selector: 'app-employee-add',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent {
  form: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService,
    private router: Router
  ) {
    this.form = this.fb.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      gender: [''],
      designation: [''],
      salary: [0],
      date_of_joining: [''],
      department: [''],
      employee_photo: [''] // base64 will be stored here
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.form.patchValue({
        employee_photo: reader.result // base64 string
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    const data = this.form.value;
    this.empService.add(data).subscribe({
      next: () => this.router.navigate(['/employees']),
      error: (err) => this.error = err.message
    });
  }
}
