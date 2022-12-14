package com.app.service;

import com.app.exception.UserNotFound;
import com.app.model.Movie;
import com.app.model.Trailer;
import com.app.model.User;

import java.time.LocalDate;
import java.util.List;

public interface IMovieService {
    public User addMovieToWatchlist(String email, Movie movie)throws UserNotFound;

    public User addMovieToFavourites(String email, Movie movie)throws UserNotFound;

    public User removeMovieFromWatchList(String email,Movie movie)throws UserNotFound;

    public User removeMovieFromFavourites(String email,Movie movie)throws UserNotFound;

    public List<Trailer> getAllTrailers();
}
