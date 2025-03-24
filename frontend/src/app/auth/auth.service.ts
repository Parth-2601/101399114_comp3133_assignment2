import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { LOGIN, SIGNUP } from '../graphql/queries';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // BehaviorSubject to track authentication state
  private authStatusSource = new BehaviorSubject<boolean>(this.hasToken());
  authStatus$ = this.authStatusSource.asObservable();

  constructor(
    private apollo: Apollo,
    private router: Router
  ) {}

  login(username: string, password: string): Observable<any> {
    return this.apollo.query<any>({
      query: LOGIN,
      variables: { username, password },
      fetchPolicy: 'no-cache'
    }).pipe(
      map(result => {
        const token = result?.data?.login?.token;
        if (token) {
          localStorage.setItem('token', token);
          this.authStatusSource.next(true);
        }
        return result?.data?.login?.user;
      })
    );
  }

  signup(username: string, email: string, password: string): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: SIGNUP,
      variables: { username, email, password }
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authStatusSource.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Helper method to check if token exists
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}