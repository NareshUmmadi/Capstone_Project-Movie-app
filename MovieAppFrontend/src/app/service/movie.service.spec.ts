import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;
  let httpClientSpy:jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient',['get','put','delete','post']);
    service=new MovieService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get now playing movies',()=>{
    httpClientSpy.get.and.returnValue(of(true));
    service.getNowPlayingMovies();
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });

  it('should get popular movies',()=>{
    httpClientSpy.get.and.returnValue(of(true));
    service.getPopularMovies();
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });

  it('should get top rated movies',()=>{
    httpClientSpy.get.and.returnValue(of(true));
    service.getTopRatedMovies();
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });

  it('should get all trailers',()=>{
    httpClientSpy.get.and.returnValue(of(true));
    service.getAllTrailers();
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });
  it('should add movie to watchlist',()=>{
    httpClientSpy.post.and.returnValue(of(true));
    service.addMovieToWatchlist("","");
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  });
  it('should add movie to favourites',()=>{
    httpClientSpy.post.and.returnValue(of(true));
    service.addMovieToFavourites("","");
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  });

  it('should remove movie from watchlist',()=>{
    httpClientSpy.delete.and.returnValue(of(true));
    service.removeMovieFromWatchlist("","");
    expect(httpClientSpy.delete).toHaveBeenCalledTimes(1);
  });

  it('should remove movie from favourites',()=>{
    httpClientSpy.delete.and.returnValue(of(true));
    service.removeMovieFromFavourite("","").subscribe((a)=>{
      expect(a).toEqual(true);
    })
    expect(httpClientSpy.delete).toHaveBeenCalledTimes(1);
  });


  it('should get movie by given movie id',()=>{
    httpClientSpy.get.and.returnValue(of(true));
    service.getMovieById("").subscribe(a=>expect(a).toEqual(true));
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });

  it('should get movie cast by movie id',()=>{
    httpClientSpy.get.and.returnValue(of(true));
    service.getMovieCast("").subscribe(a=>expect(a).toEqual(true));
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });
  it('should get recommendation movie by given movie id',()=>{
    httpClientSpy.get.and.returnValue(of(true));
    service.getRecommandationMovies("").subscribe(a=>expect(a).toEqual(true));
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });
  it('should get movie videos by given movie id',()=>{
    httpClientSpy.get.and.returnValue(of(true));
    service.getMovieVideos("").subscribe(a=>expect(a).toEqual(true));
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });
  it('should search movies',()=>{
    httpClientSpy.get.and.returnValue(of(true));
    service.search("").subscribe(a=>expect(a).toEqual(true));
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });

  it('should get similar movies',()=>{
    httpClientSpy.get.and.returnValue(of(true));
    service.getSimilarMovies("").subscribe(a=>expect(a).toEqual(true));
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });



});
