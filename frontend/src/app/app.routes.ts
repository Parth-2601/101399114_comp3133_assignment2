import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeAddComponent } from './employees/employee-add/employee-add.component';
import { EmployeeEditComponent } from './employees/employee-edit/employee-edit.component';
import { EmployeeDetailComponent } from './employees/employee-detail/employee-detail.component';
import { AuthGuard } from './core/auth.guard';
import { HomeComponent } from './home/home.component'; // ✅ Import home

export const appRoutes: Routes = [
  { path: '', component: HomeComponent }, // ✅ Show login/signup on homepage
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'employees', component: EmployeeListComponent, canActivate: [AuthGuard] },
  { path: 'employees/add', component: EmployeeAddComponent, canActivate: [AuthGuard] },
  { path: 'employees/edit/:id', component: EmployeeEditComponent, canActivate: [AuthGuard] },
  { path: 'employees/:id', component: EmployeeDetailComponent, canActivate: [AuthGuard] },
];
