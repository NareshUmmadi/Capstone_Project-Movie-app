import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  giveCredits(email: string, credits: any): Observable<any> {
    return this.http.put("http://localhost:8090/admin/admin/credits/" + email + "/" + credits, null, {
      observe: 'response',
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token")}
    });
  }
  // giveCredits(email: string, credits: any): Observable<any> {
  //   return this.http.put("http://localhost:8088/admin/credits/" + email + "/" + credits, null, {
  //     observe: 'response',
  //     headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token")}
  //   });
  // }

  giveSubscription(email: string, type: any) {
    return this.http.post("http://localhost:8090/admin/admin/free-subs/" + email + "/" + type, null, {
      observe: 'response',
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token")}
    });

  }
  // giveSubscription(email: string, type: any) {
  //   return this.http.post("http://localhost:8088/admin/free-subs/" + email + "/" + type, null, {
  //     observe: 'response',
  //     headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token")}
  //   });

  // }

  getAllUsers():Observable<any>{
    return this.http.get("http://localhost:8090/admin/users",{observe:'response',headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token")}});
  }
  // getAllUsers():Observable<any>{
  //   return this.http.get("http://localhost:8088/users",{observe:'response',headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token")}});
  // }

}
