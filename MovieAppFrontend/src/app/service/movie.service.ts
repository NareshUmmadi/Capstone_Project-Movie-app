import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  api_key:string="6696ec8c57a65e442bc924fba1638a9b";

  constructor(private http:HttpClient) { }

  getNowPlayingMovies():Observable<any>{
    return this.http.get("https://api.themoviedb.org/3/movie/now_playing?api_key="+this.api_key+"&language=en-US&page=1",{observe:'response'});
  }


  getPopularMovies():Observable<any>{
    return this.http.get("https://api.themoviedb.org/3/movie/popular?api_key="+this.api_key+"&language=en-US&page=1",{observe:'response'});
  }

  getTopRatedMovies():Observable<any>{
    return this.http.get("https://api.themoviedb.org/3/movie/top_rated?api_key="+this.api_key+"&language=en-US&page=1",{observe:'response'});
  }

  getAllTrailers():Observable<any>{
    return this.http.get("http://localhost:8090/user/trailers",{observe:'response'});
  }
  // getAllTrailers():Observable<any>{
  //   return this.http.get("http://localhost:8082/user/trailers",{observe:'response'});
  // }


  addMovieToWatchlist(email:string,movie:any):Observable<any>{
    return this.http.post("http://localhost:8090/user/user/watchlist/"+email,movie,{observe:'response',
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token")}});          
  }
  // addMovieToWatchlist(email:string,movie:any):Observable<any>{
  //   return this.http.post("http://localhost:8082/user/watchlist/"+email,movie,{observe:'response',
  //   headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token")}});          
  // }

  addMovieToFavourites(email:string,movie:any):Observable<any>{
    return this.http.post("http://localhost:8090/user/user/favourite/"+email,movie,{observe:'response',
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token")}});          
  }

  // addMovieToFavourites(email:string,movie:any):Observable<any>{
  //   return this.http.post("http://localhost:8082/user/favourite/"+email,movie,{observe:'response',
  //   headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token")}});          
  // }

  removeMovieFromWatchlist(email:string,movie:any):Observable<any>{
    return this.http.delete("http://localhost:8090/user/user/watchlist/"+email,{observe:'response',
    body:movie,headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token")}});
  }
  // removeMovieFromWatchlist(email:string,movie:any):Observable<any>{
  //   return this.http.delete("http://localhost:8082/user/watchlist/"+email,{observe:'response',
  //   body:movie,headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token")}});
  // }

  removeMovieFromFavourite(email:string,movie:any):Observable<any>{
    return this.http.delete("http://localhost:8090/user/user/favourite/"+email,{observe:'response',
    body:movie,headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token")}});
  }
  // removeMovieFromFavourite(email:string,movie:any):Observable<any>{
  //   return this.http.delete("http://localhost:8082/user/favourite/"+email,{observe:'response',
  //   body:movie,headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token")}});
  // }

  getMovieById(movieId:any):Observable<any>{
    return this.http.get("https://api.themoviedb.org/3/movie/"+movieId+"?api_key="+this.api_key+"&language=en-US", {observe: 'response'})
  }

  getMovieCast(movieId:any):Observable<any>{
    return this.http.get("https://api.themoviedb.org/3/movie/"+movieId+"/credits?api_key="+this.api_key+"&language=en-US", {observe: 'response'})
  }

  getRecommandationMovies(movieId:any):Observable<any>{
    return this.http.get("https://api.themoviedb.org/3/movie/"+movieId+"/recommendations?api_key="+this.api_key+"&language=en-US&page=1", {observe: 'response'})
    
  }

  getMovieVideos(movieId:any):Observable<any>{
    return this.http.get("https://api.themoviedb.org/3/movie/"+movieId+"/videos?api_key="+this.api_key+"&language=en-US", {observe: 'response'});
  }

  search(movieName:any):Observable<any>{
    return this.http.get("https://api.themoviedb.org/3/search/movie?api_key="+this.api_key+"&language=en-US&query="+movieName+"&page=1&include_adult=false", {observe: 'response'});
  }

  getSimilarMovies(movieId:any):Observable<any>{
    return this.http.get<any>("https://api.themoviedb.org/3/movie/"+movieId+"/similar?api_key="+this.api_key+"&language=en-US&page=1", {observe: 'response'});
  }
}
