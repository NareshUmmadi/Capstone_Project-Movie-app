import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-gift-subscription',
  templateUrl: './gift-subscription.component.html',
  styleUrls: ['./gift-subscription.component.css']
})
export class GiftSubscriptionComponent implements OnInit {

  user:any;
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data:any,public _sheetRef:MatBottomSheetRef<GiftSubscriptionComponent>,private _admin:AdminService,private _snackbar:MatSnackBar) { 
    this.user=data;
   }


  subscriptionFormControl= new FormControl("",[Validators.required]);


  ngOnInit(): void {

  }

  giftSubscription(){
    this._admin.giveSubscription(this.user.email,this.subscriptionFormControl.value).subscribe({
      next:(res)=>{
        this._snackbar.open("Subscription gifted successfully to "+this.user.userName,"Okay",{
          duration:2000,
          panelClass:['text-primary']
        });
        this._sheetRef.dismiss();
      }
    })
  }

}
