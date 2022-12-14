package com.app.service;

import com.app.exception.UserNotFound;
import com.app.model.*;
import com.app.repository.TrailerRepository;
import com.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class MovieService implements IMovieService{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TrailerRepository trailerRepository;


    @Override
    public User addMovieToWatchlist(String email, Movie movie) throws UserNotFound {
        User repUser = userRepository.findById(email).orElseThrow(UserNotFound::new);

        if(repUser.getWatchlist()==null){
            repUser.setWatchlist(new ArrayList<Movie>());
        }
        List<Movie> watchList= repUser.getWatchlist();
        watchList.add(movie);
        repUser.setWatchlist(watchList);
        return userRepository.save(repUser);
    }

    @Override
    public User addMovieToFavourites(String email, Movie movie) throws UserNotFound {
        User repUser = userRepository.findById(email).orElseThrow(UserNotFound::new);

        if(repUser.getFavourites()==null){
            repUser.setFavourites(new ArrayList<Movie>());
        }
        List<Movie> favouriteList= repUser.getFavourites();
        favouriteList.add(movie);
        repUser.setFavourites(favouriteList);
        return userRepository.save(repUser);
    }

    @Override
    public User removeMovieFromWatchList(String email, Movie movie) throws UserNotFound {
        User repUser = userRepository.findById(email).orElseThrow(UserNotFound::new);
        List<Movie> watchList=repUser.getWatchlist();
        watchList.remove(movie);
        repUser.setWatchlist(watchList);
        return userRepository.save(repUser);
    }

    @Override
    public User removeMovieFromFavourites(String email, Movie movie) throws UserNotFound {
        User repUser = userRepository.findById(email).orElseThrow(UserNotFound::new);
        List<Movie> favourites=repUser.getFavourites();
        favourites.remove(movie);
        repUser.setFavourites(favourites);
        return userRepository.save(repUser);
    }

    @Override
    public List<Trailer> getAllTrailers() {
        return trailerRepository.findAll();
    }
}
