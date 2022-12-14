import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { MovieService } from 'src/app/service/movie.service';
import { UserService } from 'src/app/service/user.service';
import { GiftSubscriptionComponent } from '../gift-subscription/gift-subscription.component';
import { GiveCreditsComponent } from '../give-credits/give-credits.component';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  userDetail: any={};
  imgSrc: string = "data:image/png;base64,";
  users:any;

  constructor(private _bottomSheet: MatBottomSheet,private _snackbar:MatSnackBar,public _user: UserService, private router: Router,private _movie:MovieService,public dialog: MatDialog,private _admin:AdminService) {
    this.getUserDetails();
    this.getAllUsers();
  }
  getAllUsers(){
    this._admin.getAllUsers().subscribe({
      next:(res)=>{
        this.users=res.body;
        this.users=this.users.filter((f:any)=>f.email!="admin@gmail.com");
      }
    });
  }

  getUserDetails() {
    this._user.getUserDetails(this._user.user.email).subscribe({
      next: (res) => {
        this.userDetail = res.body;
        this._user.userDetail=this.userDetail;
        this.imgSrc = "data:image/png;base64,"+ this.userDetail.profileImage.imageData;
      }
    });
  }


  ngOnInit(): void {
  }

  deleteAccount(user:any){
    this._user.deleteAccount(user.email).subscribe({
      next:(res)=>{
        this._snackbar.open("Account of user "+user.email+" deleted successfully","Okay",{
          duration:2000,
          panelClass:['text-primary']
        });
        this.getAllUsers();
      }
    })
  }

  giftCredits(user:any){
    let ref=this.dialog.open(GiveCreditsComponent,{
      data:user
    });

    ref.afterClosed().subscribe(a=>this.getAllUsers());
  }


  isSubsctiptionActive(user:any):boolean{
    let subDate: any = Date.parse(user.subscription.deactivationDate);
    console.log(user.subscription.deactivationDate);
    if (subDate > Date.now()) {
      console.log(subDate);
      return true;
    }
    return false;
  }

  giftSubscription(user:any){
   let ref=this._bottomSheet.open(GiftSubscriptionComponent,{
    data:user
   });

   ref.afterDismissed().subscribe(a=>this.getAllUsers());

  }

}
