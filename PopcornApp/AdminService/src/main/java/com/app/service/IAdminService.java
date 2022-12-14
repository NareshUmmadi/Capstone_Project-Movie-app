package com.app.service;

import com.app.exception.UserNotFound;
import com.app.model.Trailer;
import com.app.model.User;

import java.util.List;

public interface IAdminService{

    public User giveCredits(String email, double credits) throws UserNotFound;

    public User giveFreeSubscription(String email, String type) throws UserNotFound;

    public User activateSubscription(String email, String type) throws UserNotFound;

    public List<Trailer> addTrailer(Trailer trailer);

    public List<Trailer> removeTrailer(Trailer trailer);

    public List<User> getAllUsers();
}
