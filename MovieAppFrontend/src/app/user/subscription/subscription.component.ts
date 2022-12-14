import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  
  constructor(public _user:UserService,private _snackBar: MatSnackBar,public dialogRef: MatDialogRef<SubscriptionComponent>) { }

  ngOnInit(): void {

  }

  subscriptionFormControl= new FormControl("",[Validators.required,this.verifyAmount.bind(this)]);


  verifyAmount(control:AbstractControl){
    console.log(control.value);
    switch(control.value){
      case "silver":if(this._user.userDetail.credits>=100)
            return null;
             break;
      case "gold":if(this._user.userDetail.credits>=300)
          return null;
           break;
      case "diamond":if(this._user.userDetail.credits>=500)
          return null;
           break;
    }
    return {"insufficientCredits":true};
  }

  getSubscription(){
    this._user.getSubscription(this._user.userDetail.email,this.subscriptionFormControl.value).subscribe({
      next:(res)=>{
        this._snackBar.open("Successfully availed "+this.subscriptionFormControl.value?.toUpperCase()+" subscription","Okay",{
          duration:3000
        });
        this.dialogRef.close();
      }
    })
  }

}
