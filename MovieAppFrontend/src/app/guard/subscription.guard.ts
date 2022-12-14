import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionGuard implements CanActivate {
  constructor(private _user: UserService, private _snackBar: MatSnackBar,private router:Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this._user.decodeTokenVerifyAndLogin();
    if (this._user.userDetail == null) {
      this._snackBar.open("Login to view content.", "Okay", { duration: 3000, panelClass: ['text-info','fw-bold','h5'] });
      return this.router.createUrlTree(['']);
    }
    if (this._user.isAdminLoggedIn())
      return true;

    if (!this._user.isSubscriptionActive()) {
      this._snackBar.open("Please purchase subscription to view content...!!!", "Okay", { duration: 3000, panelClass: ['text-info','fw-bold','h5'] });
      return this.router.createUrlTree(['']);
    }
    return true;
  }

}
