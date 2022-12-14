import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-resend-verification',
  templateUrl: './resend-verification.component.html',
  styleUrls: ['./resend-verification.component.css']
})
export class ResendVerificationComponent implements OnInit {

  constructor(public _user:UserService,private _snackBar: MatSnackBar,private router:Router) { }

  ngOnInit(): void {
  }

  resendMail(){
    this._user.resendVerificationMail(this._user.tmpUser.email).subscribe({
      next:(res)=>{
        this._snackBar.open("Verification email has been sent successfully","Okay",{
          duration:3000
        });
        setTimeout(()=>{
          this.router.navigate([""]);
        },1000);
      }
    })
  }

}
