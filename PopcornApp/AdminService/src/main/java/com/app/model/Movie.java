package com.app.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Movie {
    String backdrop_path;
    String overview;
    int id;
    String release_date;
    String poster_path;
    double vote_average;
    String title;
}
