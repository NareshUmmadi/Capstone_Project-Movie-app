import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pipe } from 'rxjs';
import { MovieService } from 'src/app/service/movie.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(public _user: UserService, private router: Router, private _movie: MovieService, private route: ActivatedRoute) { }
  movieName: any;
  movieList: any = [];
  sorted: any = [];

  userDetail: any = {};
  imgSrc: string = "data:image/png;base64,";
  themes: any = [
    { viewValue: 'By Name' },
    { viewValue: 'By Date' },
  ];

  ngOnInit(): void {
    this.route.paramMap.subscribe(a => {
      this.movieName = a.get('query')
      this.get();
    });
  }

  get() {
    if (this.movieName) {
      this._movie.search(this.movieName).subscribe({
        next: (res) => {
          this.movieList = res.body.results.filter((obj: any) => {
            return obj['poster_path'] !== null;
          });
          console.log(this.movieList);
        }
      });
    }
    else {
      this.movieList = null;
    }
  }

  sortByName() {
    this.movieList = this.movieList.sort(function (a: any, b: any) {
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
    return this.movieList;
  }

  sortByDate() {
    this.movieList = this.movieList.sort(function (a: any, b: any) {
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
    return this.movieList;
  }

  openMovieDetail(movie:any){
    this.router.navigate(['movie',movie.id]);
  }
  
  getUserDetails() {
    this._user.getUserDetails(this._user.user.email).subscribe({
      next: (res) => {
        this.userDetail = res.body;
        this._user.userDetail = this.userDetail;
        this.imgSrc = "data:image/png;base64," + this.userDetail.profileImage.imageData;
      }
    });
  }

  addToWatchList(movie: any) {
    this._movie.addMovieToWatchlist(this._user.userDetail.email, movie).subscribe({
      next: (res) => {
        this.getUserDetails();
      }
    })
  }

  addToFavourite(movie: any) {
    this._movie.addMovieToFavourites(this._user.userDetail.email, movie).subscribe({
      next: (res) => {
        this.getUserDetails();
        this._user.userDetail = this.userDetail;
      }
    })
  }

  removeFromFavourite(movie: any) {
    this._movie.removeMovieFromFavourite(this._user.user.email, movie).subscribe({
      next: (res) => {
        this.getUserDetails();
        this._user.userDetail = this.userDetail;
      }
    });
  }

  removeFromWatchlist(movie: any) {
    this._movie.removeMovieFromWatchlist(this._user.user.email, movie).subscribe({
      next: (res) => {
        this.getUserDetails();
        this._user.userDetail = this.userDetail;
      }
    });
  }
}
