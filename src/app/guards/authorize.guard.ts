import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserProfile } from '../profile/user-profile';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {

  constructor(private router: Router, private http: HttpClient) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user: UserProfile = JSON.parse(sessionStorage.getItem('user'));
    return this.checkUserRole(next, user);
  }

  checkUserRole(route: ActivatedRouteSnapshot, user: UserProfile) {
    
    if(user === null || user.role === null) {
      this.router.navigate(['/login']);
      return false;
    }

    if(route.data.role.includes(user.role)) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
