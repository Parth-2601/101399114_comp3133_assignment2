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
  uploading = false;

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
      employee_photo: [''] // will hold the uploaded filename
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.uploading = true;
    const formData = new FormData();
    formData.append('photo', file);

    fetch('http://localhost:4000/api/upload', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        this.form.patchValue({ employee_photo: data.filename });
        this.uploading = false;
      })
      .catch(() => {
        this.error = 'Image upload failed';
        this.uploading = false;
      });
  }

  onSubmit() {
    const data = this.form.value;
  
    // ✅ Ensure proper types before sending to backend
    data.salary = parseFloat(data.salary);
    data.date_of_joining = new Date(data.date_of_joining).toISOString();
  
    console.log('Sending:', data); // Optional: debug log
  
    this.empService.add(data).subscribe({
      next: () => this.router.navigate(['/employees']),
      error: (err) => this.error = err.message
    });
  }
}  
