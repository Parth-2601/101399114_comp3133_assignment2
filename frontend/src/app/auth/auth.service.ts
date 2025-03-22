import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LOGIN, SIGNUP } from '../graphql/queries';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private apollo: Apollo) {}

  login(username: string, password: string) {
    return this.apollo.query<any>({
      query: LOGIN,
      variables: { username, password },
      fetchPolicy: 'no-cache'
    }).pipe(
      map(result => {
        const token = result.data.login.token;
        localStorage.setItem('token', token);
        return result.data.login.user;
      })
    );
  }

  signup(username: string, email: string, password: string) {
    return this.apollo.mutate<any>({
      mutation: SIGNUP,
      variables: { username, email, password }
    });
  }

  logout() {
    localStorage.clear();
    window.location.href = '/login'; // ✅ redirect on logout
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
