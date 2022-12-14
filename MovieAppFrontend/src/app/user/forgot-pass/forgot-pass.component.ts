import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UserService,private _snackbar:MatSnackBar,private router:Router) {
    
  }

  forgotForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]]
  })

  ngOnInit(): void {
  }

  forgotPass(){
    this.userService.forgotPassword(this.forgotForm.value.email).subscribe({
      next:(res)=>{
        this._snackbar.open("Your password has been successfully sent to your email","Okay",{
          duration:2000,
          panelClass:['text-primary']
        });
       this.router.navigate(['login']); 
      }
    });
  }

}
