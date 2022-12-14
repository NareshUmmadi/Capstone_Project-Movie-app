import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-give-credits',
  templateUrl: './give-credits.component.html',
  styleUrls: ['./give-credits.component.css']
})
export class GiveCreditsComponent implements OnInit {

  user:any;
  constructor(private _admin:AdminService,private _snackbar:MatSnackBar,public dialogRef: MatDialogRef<GiveCreditsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.user=data;
     }

  ngOnInit(): void {
  }

  creditControl=new FormControl("",[Validators.required,Validators.min(50)]);

  giftCredits(credits:any){
    if(this.creditControl.valid){
      this._admin.giveCredits(this.user.email,credits).subscribe({
        next:(res)=>{
          this._snackbar.open("Credits added successfully.","Okay",{
            duration:2000,
            panelClass:['text-danger']
          });
          this.dialogRef.close()
        }
      })
    }
    else{
      this._snackbar.open("Enter a valid amount (greater than 50)","Okay",{
        duration:2000,
        panelClass:['text-danger']
      });
    }
  }

  close(){
    this.dialogRef.close();
  }
}
