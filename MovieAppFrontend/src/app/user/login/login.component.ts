import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm = this.fb.group({
    email: [null, [Validators.email, Validators.required]],
    password: [null, [Validators.required]]
  })

  constructor(private _snackbar:MatSnackBar ,private fb: FormBuilder, private _user:UserService,private router:Router) {

  }
  ngOnInit(): void {
  }

  login() {
    this._user.login(this.loginForm.value).subscribe({
      next:(res)=>{
        console.log(res.body.token);
        const helper = new JwtHelperService();
        let user=helper.decodeToken(res.body.token).user;
        console.log(user);
        if(user.isVerified){
          this._user.user=user;
          localStorage.setItem('token',res.body.token);
          this._user.getUserDetails(this._user.user.email).subscribe({
            next:(res)=>{
              this._user.userDetail=res.body;
              this._snackbar.open("Logged in successfully","Okay",{
                duration:2000,
                panelClass:['text-primary','fw-bold','h6']
              });
              this.router.navigate(['']);
            }
          });
          this.router.navigate(['']);
        }
        else{
          this._user.tmpUser=user;
          this.router.navigate(['user','resend']);
        }
       
      },
      error:(err)=>{
        console.log(err);
        if(err.status==401){
          this._snackbar.open(err.error.message,"Okay",{
            duration:2000,
            panelClass:['text-primary','fw-bold','h6']
          })
        }
        if(err.status==404){
          this._snackbar.open(err.error.message,"Okay",{
            duration:2000,
            panelClass:['text-primary','fw-bold','h6']
          })
        }
        if(err.status==503){
          this.router.navigate(['service']);
        }
      }
    })
  }


}
