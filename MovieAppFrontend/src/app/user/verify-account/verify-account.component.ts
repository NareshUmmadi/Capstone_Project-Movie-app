import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {

  constructor(private route:ActivatedRoute,private _user:UserService,private router:Router,private _snackBar: MatSnackBar) {
    this.route.paramMap.subscribe((a:any)=>{
      this._user.activateAccount(a.get('email')).subscribe({
        next:(res)=>{
          this._snackBar.open("Account has been successfully verified ....!!","Okay",{
            duration:3000
          });
          this.router.navigate(['']);
        },
        error:(err)=>{
          console.log("account verification failed");
        }
      })
    })
   
  }

  ngOnInit(): void {
  }

  
}
