import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { PlayComponent } from 'src/app/movie/play/play.component';
import { MovieService } from 'src/app/service/movie.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit ,AfterViewInit{
  @ViewChild("image")
   imageCont!:ElementRef;

  nowPlayingMovies:any;
  popularMovies:any;
  topRatedMovies:any;
  trailers:any;
 
  constructor(private _movie:MovieService,public dialog: MatDialog,public _user:UserService, private router: Router) { }



  ngOnInit(): void {
    this._movie.getNowPlayingMovies().subscribe({
      next:(res)=>{
        this.nowPlayingMovies=res.body.results;
        console.log(this.nowPlayingMovies);
      }
    });
    this._movie.getPopularMovies().subscribe({
      next:(res)=>{
        this.popularMovies=res.body.results;
      }
    })
    this._movie.getTopRatedMovies().subscribe({
      next:(res)=>{
        this.topRatedMovies=res.body.results;
      }
    })

    this._movie.getAllTrailers().subscribe({
      next:(res)=>{
        this.trailers=res.body;
        let backgroundUrl="https://img.youtube.com/vi/"+this.trailers[0].key+"/hqdefault.jpg"
        this.imageCont.nativeElement.style.background="url("+backgroundUrl+")";
      }
    })

  }

  ngAfterViewInit(): void {
   
  }


  play(trailer:any){

    this.dialog.open(PlayComponent,{
      data:trailer.key,
      panelClass:['playDialog']
    })
  }

  changeBackground(trailer:any){
    let backgroundUrl="https://img.youtube.com/vi/"+trailer.key+"/hqdefault.jpg"
    this.imageCont.nativeElement.style.background="url("+backgroundUrl+")";
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

  openMovie(movie:any){
    console.log("opening movie");
  }

  sendToMoviePage(movieId:any){
    console.log("sending id -> " +movieId);
    this.router.navigate(['/movie', movieId]);
  }

  searchMovie(query:string){
    this.router.navigate(['search',query]);
  }

}
