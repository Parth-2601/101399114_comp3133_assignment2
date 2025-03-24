import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { NgIf } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component'; // ✅ import it

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, NavbarComponent], // ✅ add here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '101399114_comp3133_assignment2';

  constructor(public auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
