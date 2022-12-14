import { ViewportScroller } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/service/movie.service';
import { UserService } from 'src/app/service/user.service';
import { PlayComponent } from '../play/play.component';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit,AfterViewInit {

  movieId: any
  movieDetail: any;
  movieCast: any;
  recommandationMovies: any;
  trailers: any;
  officialTeaser: any;
  flag: any;

  constructor(public _user:UserService ,private _movie: MovieService, public dialog: MatDialog, private route: ActivatedRoute, private router: Router,private viewportScroller:ViewportScroller) { 
    // this._user.decodeTokenVerifyAndLogin();
  }
  ngAfterViewInit(): void {
    this.getMovieVideos();
  }
  @ViewChild("image")
  imageCont!: ElementRef;

  ngOnInit(): void {

    this.movieId = this.route.snapshot.paramMap.get('id');

    this._movie.getMovieById(this.movieId).subscribe(data => {
      this.movieDetail = data.body;
      let element = document.getElementById('backgroundImage');
      if (element) {
        element.style.backgroundImage = "url(" + 'https://image.tmdb.org/t/p/original' + this.movieDetail.backdrop_path + ")";
      }
    });

    this._movie.getMovieCast(this.movieId).subscribe({
      next: (res) => {
        this.movieCast = res.body.cast.filter((obj:any) => {
          return obj['profile_path'] !== null;
        });
        // console.log("cast -> "+ JSON.stringify(this.movieCast))
      }
    })
    this.getSimilarMovies();
    
  }

  getMovieVideos(){
    this._movie.getMovieVideos(this.movieId).subscribe({
      next: (res) => {
        this.trailers = res.body.results;
        let backgroundUrl = "https://img.youtube.com/vi/" + this.trailers[0].key + "/hqdefault.jpg"
        this.imageCont.nativeElement.style.background = "url(" + backgroundUrl + ")";

        this.officialTeaser = this.findOfficialTeaser();
        console.log(JSON.stringify(this.officialTeaser));
      }
    })

  }

  getSimilarMovies(){
    this._movie.getSimilarMovies(this.movieId).subscribe({
      next: (res) => {
        this.recommandationMovies = res.body.results.filter((obj:any) => {
          return (obj['poster_path']!=undefined  && obj['poster_path'] !== null);
        });
      }
    })
  }

  play(trailer: any) {
    this.dialog.open(PlayComponent, {
      data: trailer.key,
      panelClass: ['playDialog']
    })
  }

  findOfficialTeaser(): any {
    return this.trailers.filter((object: any) => {
      return object['type'] == 'Trailer';
    })
  }

  playOfficialTeaser(){
    console.log("key -> "+ this.officialTeaser[0].key)
    this.dialog.open(PlayComponent, {
      data: this.officialTeaser[0].key,
      panelClass: ['playDialog']
    })
  }

  changeBackground(trailer: any) {
    let backgroundUrl = "https://img.youtube.com/vi/" + trailer.key + "/hqdefault.jpg"
    this.imageCont.nativeElement.style.background = "url(" + backgroundUrl + ")";
  }

  sendToMoviePage(movieId:any){
    this.router.navigate(['/movie', movieId]);
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }


  addToFavourite(movie:any){
    this._movie.addMovieToFavourites(this._user.user.email,movie).subscribe({
      next:(res)=>{
        this.refreshUserDetail();
        console.log("added to favourite");
      }
    });
  }
  addToWatchlist(movie:any){
    this._movie.addMovieToWatchlist(this._user.user.email,movie).subscribe({
      next:(res)=>{
        this.refreshUserDetail();
        console.log("added to watchlist");
      }
    });
  }

  removeFromWatchlist(movie:any){
    this._movie.removeMovieFromWatchlist(this._user.user.email,movie).subscribe({
      next:(res)=>{
        this.refreshUserDetail();
        console.log("removed from watchlist");
      }
    });
  }

  removeFromFavourite(movie:any){
    this._movie.removeMovieFromFavourite(this._user.user.email,movie).subscribe({
      next:(res)=>{
        this.refreshUserDetail();
        console.log("removed from favourite");
      }
    });
  }

  refreshUserDetail(){
    this._user.getUserDetails(this._user.user.email).subscribe({
      next:(res)=>{
        this._user.userDetail=res.body;
      }
    })
  }

}
