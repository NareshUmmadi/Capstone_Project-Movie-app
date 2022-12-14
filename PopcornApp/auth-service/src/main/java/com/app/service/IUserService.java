package com.app.service;

import com.app.exception.UserAlreadyExistException;
import com.app.exception.InvalidCredentialsException;
import com.app.exception.UserNotFoundException;
import com.app.model.User;

import java.net.MalformedURLException;
import java.util.Map;

public interface IUserService {
    public User registerUser(User user) throws UserAlreadyExistException, MalformedURLException;

    public Map<String,String> login(User user)throws InvalidCredentialsException, UserNotFoundException;

    public boolean deleteAccount(String email) throws UserNotFoundException;

    public User verifyPassword(User user) throws InvalidCredentialsException, UserNotFoundException;

    public User changePassword(User user)throws UserNotFoundException;

    public User activateAccount(String email) throws UserNotFoundException;

    public boolean resendVerificationEmail(String email) throws MalformedURLException;

    public User forgotPassword(String email)throws UserNotFoundException;

}
