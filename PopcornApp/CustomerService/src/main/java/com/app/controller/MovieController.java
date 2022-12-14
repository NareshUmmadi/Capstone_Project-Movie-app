package com.app.controller;

import com.app.exception.UserNotFound;
import com.app.model.Movie;
import com.app.service.IMovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController()
@CrossOrigin("*")
@RequestMapping("user")
public class MovieController {
    @Autowired
    IMovieService movieService;

    @DeleteMapping("/user/favourite/{email}")
    public ResponseEntity<?> deleteFromFavourites(@RequestBody Movie movie, @PathVariable("email")String email) throws UserNotFound {
        return ResponseEntity.ok(movieService.removeMovieFromFavourites(email,movie));
    }

    @DeleteMapping("/user/watchlist/{email}")
    public ResponseEntity<?> deleteFromWatchList(@RequestBody Movie movie,@PathVariable("email")String email) throws UserNotFound {
        return ResponseEntity.ok(movieService.removeMovieFromWatchList(email,movie));
    }

    @PostMapping("/user/favourite/{email}")
    public ResponseEntity<?> addMovieInFavourites(@RequestBody Movie movie,@PathVariable("email")String email) throws UserNotFound {
        return ResponseEntity.ok(movieService.addMovieToFavourites(email, movie));
    }

    @PostMapping("/user/watchlist/{email}")
    public ResponseEntity<?> addMovieInWatchList(@RequestBody Movie movie,@PathVariable("email")String email) throws UserNotFound {
        return ResponseEntity.ok(movieService.addMovieToWatchlist(email, movie));
    }

    @GetMapping("/trailers")
    public ResponseEntity<?> getTrailers(){
        return ResponseEntity.ok(movieService.getAllTrailers());
    }

}
