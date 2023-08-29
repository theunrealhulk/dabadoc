import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {

    // Check if the value exists in localStorage
    const isAuthenticated = localStorage.getItem('api_key');

    if (isAuthenticated) {
      console.log('authenticated')
      if (state.url === '/') {
        // Redirect to '/questions' if the route is '/'
        return this.router.createUrlTree(['/questions']);
      }
      return true; // Allow navigation
    } else {
      // Redirect to the sign-in page
      return this.router.createUrlTree(['/']);
    }
  }
}
