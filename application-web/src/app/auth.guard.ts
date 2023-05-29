import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userId = localStorage.getItem('UserId');
    const requestedUserId = next.params['id'];

    if (userId && requestedUserId && userId !== requestedUserId) {
      this.router.navigate(['/updateUser', userId]);
      return false;
    }

    return true;
  };
}
