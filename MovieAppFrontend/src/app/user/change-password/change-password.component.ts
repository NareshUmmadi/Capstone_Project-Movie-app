import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private _user:UserService,private fb:FormBuilder,private _snackBar: MatSnackBar,public dialogRef: MatDialogRef<ChangePasswordComponent>) { }

  ngOnInit(): void {
  }

  changePasswordForm=this.fb.group({
    "currentPassowrd":['',[Validators.required],[this.validateCurrentPassword.bind(this)]],
    "newPassword":['',[Validators.required]]
  });


  validateCurrentPassword(control:AbstractControl):Promise<any>{
    const myResponse= new Promise((res,rej)=>{
      let user={
        "email":this._user.user.email,
        "password":control.value
      }
      console.log(user);
      this._user.verifyPassword(user).subscribe({
        next:(ress)=>{
          console.log("password is correct");
          res(null);
        },
        error:(err)=>{
          console.log("incorrect");
          res({"passwordMismatchError":true});
        }
      })
    });

    return myResponse;
  }

  get currentPassowrd():any{
    return this.changePasswordForm.get('currentPassowrd');
  }


  changePassword(){
    let user={
      "email":this._user.user.email,
      "password":this.changePasswordForm.value.newPassword
    }
    this._user.changePassword(user).subscribe({
      next:(res)=>{
        console.log("password changed");
        this._snackBar.open("Password Changed Successfully","Okay",{
          duration:2000
        });
        this.dialogRef.close();
      },
      error:(err)=>{
        console.log(err.error);
      }
    })
  }

  
}
