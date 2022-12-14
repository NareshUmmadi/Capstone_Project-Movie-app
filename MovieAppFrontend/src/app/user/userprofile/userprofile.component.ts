import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NotificationKind } from 'rxjs';
import { MovieService } from 'src/app/service/movie.service';
import { UserService } from 'src/app/service/user.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { SubscriptionComponent } from '../subscription/subscription.component';
import { TransactionsComponent } from '../transactions/transactions.component';
import { UpdateAvatarComponent } from '../update-avatar/update-avatar.component';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements  OnInit{
  userDetail: any={};
  imgSrc: string = "data:image/png;base64,";

  constructor(public _user: UserService, private router: Router,private _movie:MovieService,public dialog: MatDialog,private _snackbar:MatSnackBar) {
    this.getUserDetails();
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

  sortWatchByName(){
    this.userDetail.watchlist = this.sortByName(this.userDetail.watchlist);
  }
  sortWatchByDate(){
    this.userDetail.watchlist = this.sortByDate(this.userDetail.watchlist);
  }
  sortFavByName(){
    this.userDetail.favourites = this.sortByName(this.userDetail.favourites);
  }
  sortFavByDate(){
    this.userDetail.favourites = this.sortByDate(this.userDetail.favourites);
  }

  sortByName(list:any) {
    console.log(list);
    list = list.sort(function (a:any, b:any) {
      if (a.title < b.title) {
        return -1;
      }
      else if (a.title > b.title) {
        return 1;
      }
      else {
        return 0;
      }
    })
    return list;
  }

  sortByDate(list:any){
    console.log(list);
    list = list.sort(function (a: any, b: any) {
      if (a.release_date < b.release_date) {
        return 1;
      }
      else if (a.release_date > b.release_date) {
        return -1;
      }
      else {
        return 0;
      }
    })
    return list;
  }

  addToWatchList(movie:any){
    this._movie.addMovieToWatchlist(this.userDetail.email,movie).subscribe({
      next:(res)=>{
        this.getUserDetails();
      }
    })
  }

  addToFavourite(movie:any){
    this._movie.addMovieToFavourites(this.userDetail.email,movie).subscribe({
      next:(res)=>{
        this.getUserDetails();
        this._user.userDetail=this.userDetail;
      }
    })
  }

  removeFromFavourite(movie:any){
    this._movie.removeMovieFromFavourite(this._user.user.email,movie).subscribe({
      next:(res)=>{
        this.getUserDetails();
        this._user.userDetail=this.userDetail;
      }
    });
  }
  removeFromWatchlist(movie:any){
    this._movie.removeMovieFromWatchlist(this._user.user.email,movie).subscribe({
      next:(res)=>{
        this.getUserDetails();
        this._user.userDetail=this.userDetail;
      }
    });
  }

  openChangeDialog(){
    let ref=this.dialog.open(UpdateAvatarComponent,{
      data:this.imgSrc
    });
    ref.afterClosed().subscribe(res=>this.getUserDetails());
  }

  openMovieDetail(movie:any){
    this.router.navigate(['movie',movie.id]);
  }

  changePassword(){
    let ref=this.dialog.open(ChangePasswordComponent,{
    });
  }
  
  getSubscription(){
    let ref=this.dialog.open(SubscriptionComponent,{

    });

    ref.afterClosed().subscribe(res=>this.getUserDetails());
  }

  deleteAccount(){
    this._user.deleteAccount(this.userDetail.email).subscribe({
      next:(res)=>{
        this._snackbar.open("Account deleted successfully","Okay",{
          duration:2000,
          panelClass:['text-primary']
        });
        this._user.logOut();
      }
    }) 
  }

  showTransactions(){
    this.dialog.open(TransactionsComponent);
  }

}
