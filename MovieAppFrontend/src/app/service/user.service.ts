import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: any;
  userDetail: any;
  tmpUser: any;

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(formData: any): Observable<any> {
    return this.http.post<any>("http://localhost:8090/user/register", formData, { observe: 'response' });
  }
  // registerUser(formData: any): Observable<any> {
  //   return this.http.post<any>("http://localhost:8082/register", formData, { observe: 'response' });
  // }

  login(user: any): Observable<any> {
    return this.http.post("http://localhost:8090/auth/login", user, { observe: 'response' });
  }
  // login(user: any): Observable<any> {
  //   return this.http.post("http://localhost:8084/login", user, { observe: 'response' });
  // }

  forgotPassword(email: any): Observable<any> {
    return this.http.post("http://localhost:8090/auth/user/forgot/" + email, null, { observe: 'response' });
  }
  // forgotPassword(email: any): Observable<any> {
  //   return this.http.post("http://localhost:8084/user/forgot/" + email, null, { observe: 'response' });
  // }


  getUserDetails(email: string) {
    return this.http.get("http://localhost:8090/user/user/" + email, {
      observe: 'response',
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
    });
  }
  // getUserDetails(email: string) {
  //   return this.http.get("http://localhost:8082/user/" + email, {
  //     observe: 'response',
  //     headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
  //   });
  // }

  updateUserDetails(user: any) {
    return this.http.put("http://localhost:8090/user/user", user, {
      observe: 'response',
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
    });
  }
  // updateUserDetails(user: any) {
  //   return this.http.put("http://localhost:8082/user", user, {
  //     observe: 'response',
  //     headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
  //   });
  // }

  deleteAccount(email: string) {
    return this.http.delete("http://localhost:8090/user/user/" + email, { observe: 'response', responseType: 'text',
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }});
  }
  // deleteAccount(email: string) {
  //   return this.http.delete("http://localhost:8082/user/" + email, { observe: 'response', responseType: 'text',
  //   headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }});
  // }

  verifyPassword(user: any) {
    return this.http.post("http://localhost:8090/auth/user/verify", user, { observe: 'response' });
  }
  // verifyPassword(user: any) {
  //   return this.http.post("http://localhost:8084/user/verify", user, { observe: 'response' });
  // }

  activateAccount(email: string) {
    return this.http.post("http://localhost:8090/auth/user/verify/" + email, null, { observe: 'response' });
  }
  // activateAccount(email: string) {
  //   return this.http.post("http://localhost:8084/user/verify/" + email, null, { observe: 'response' });
  // }

  updateAvatar(email: string, formData: any) {
    return this.http.put("http://localhost:8090/user/user/" + email, formData, { observe: 'response'
    ,headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }});
  }
  // updateAvatar(email: string, formData: any) {
  //   return this.http.put("http://localhost:8082/user/" + email, formData, { observe: 'response'
  //   ,headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }});
  // }

  changePassword(user: any): Observable<any> {
    return this.http.put("http://localhost:8090/user/user/details", user, { observe: 'response', responseType: 'text' 
  ,headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token")}});
  }
  // changePassword(user: any): Observable<any> {
  //   return this.http.put("http://localhost:8082/user/details", user, { observe: 'response', responseType: 'text' 
  // ,headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token")}});
  // }


  getSubscription(email: string, type: any): Observable<any> {
    return this.http.post("http://localhost:8090/admin/user/subscribe/" + email + "/" + type, null, { observe: 'response' ,
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token")}});
  }
  // getSubscription(email: string, type: any): Observable<any> {
  //   return this.http.post("http://localhost:8088/user/subscribe/" + email + "/" + type, null, { observe: 'response' ,
  //   headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token")}});
  // }

  resendVerificationMail(email: string): Observable<any> {
    return this.http.post("http://localhost:8090/auth/user/resend/" + email, null, {
      observe: 'response'
    });
  }
  // resendVerificationMail(email: string): Observable<any> {
  //   return this.http.post("http://localhost:8084/user/resend/" + email, null, {
  //     observe: 'response'
  //   });
  // }

  isUserLoggedIn(): boolean {
    if (this.user != null && this.user != undefined && this.user.role == "USER")
      return true;
    else
      return false;
  }

  isAdminLoggedIn(): boolean {
    if (this.user != null && this.user != undefined && this.user.role == "ADMIN") {
      return true;
    }
    return false;
  }

  isAccountActivated(): boolean {
    if (this.isUserLoggedIn()) {
      if (this.user.isVerified)
        return true;
    }
    return false;
  }

  isSubscriptionActive(): boolean {
    if (this.userDetail != undefined && this.userDetail.subscription != undefined && this.userDetail.subscription != null) {
      // console.log("till here 1");
      console.log(this.userDetail.subscription.deactivationDate);
      let subDate: any = Date.parse(this.userDetail.subscription.deactivationDate);
      // console.log(subDate);
      if (subDate >= Date.now()) {
        return true;
      }
    }
    return false;
  }

  isPresentInWatchlist(movie: any): boolean {
    let flag: boolean = false;
    if (this.userDetail.watchlist != undefined) {
      this.userDetail.watchlist.forEach((element: any) => {
        if (element.id == movie.id)
          flag = true;
      });
    }
    return flag;
  }


  isPresentInFavourite(movie: any): boolean {
    let flag: boolean = false;
    if (this.userDetail.favourites != undefined) {
      this.userDetail.favourites.forEach((element: any) => {
        if (element.id == movie.id)
          flag = true;
      });
    }
    return flag;
  }

  decodeTokenVerifyAndLogin() {
    const helper = new JwtHelperService();

    let token = localStorage.getItem('token');

    if (token != undefined && token != null) {

      const expir: any = helper.getTokenExpirationDate(token);
      if (expir.getTime() >= Date.now()) {
        console.log("expire agreed");
        this.user = helper.decodeToken(token).user;
        this.getUserDetails(this.user.email).subscribe({
          next: (res) => {
            this.userDetail = res.body;
            console.log("inside" + res.body);
            console.log(this.userDetail);
          }
        });

      }
      else {
        localStorage.removeItem('token');
      }
      console.log("token from app " + token);
      console.log(expir);
    }
  }

  userLoginPromise():Promise<any>{
    return new Promise((res,rej)=>{
      const helper = new JwtHelperService();

      let token = localStorage.getItem('token');
  
      if (token != undefined && token != null) {
  
        const expir: any = helper.getTokenExpirationDate(token);
        if (expir.getTime() >= Date.now()) {
          console.log("expire agreed");
          this.user = helper.decodeToken(token).user;
          this.getUserDetails(this.user.email).subscribe({
            next: (res) => {
              this.userDetail = res.body;
              console.log("inside" + res.body);
              console.log(this.userDetail);
            }
          });
  
        }
        else {
          localStorage.removeItem('token');
          console.log("promise login rejected");
          rej("not logged in");
        }
      }
    });
  }


  logOut() {
    localStorage.removeItem('token');
    this.user = null;
    this.userDetail = null;
    this.router.navigate(['']);
  }
}
