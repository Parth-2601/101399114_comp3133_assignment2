import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.alert('You must be logged in to access this page.');
    window.location.href = '/login';
    return false;
  }
  return true;
};
