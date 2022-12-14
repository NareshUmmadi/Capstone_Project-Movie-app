package com.app.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Document
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {
    @Id
    String email;
    String userName;
    Image profileImage;
    Subscription subscription;

    List<Movie> watchlist=new ArrayList<>();

    List<Movie> favourites =new ArrayList<>();

    Double credits=300d;
    Date joiningDate = new Date();
    List<Transaction> purchaseHistory = new ArrayList<>();


    public User(String email,String userName,Image profileImage,Subscription subscription){
        this.email=email;
        this.profileImage=profileImage;
        this.subscription=subscription;
        this.userName=userName;
    }

    public User(String email, String name, Image image, Subscription subscription, List<Movie> watchlist, List<Movie> favourites, double credits) {
        this.email=email;
        this.userName=name;
        this.profileImage=image;
        this.subscription=subscription;
        this.watchlist=watchlist;
        this.favourites=favourites;
        this.credits=credits;
    }

}
