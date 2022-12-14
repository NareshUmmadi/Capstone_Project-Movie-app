package com.app.service;

import com.app.dto.CommonUser;
import com.app.dto.UserDTO;
import com.app.exception.UserAlreadyPresentException;
import com.app.exception.UserNotFound;
import com.app.model.User;
import org.springframework.web.multipart.MultipartFile;


public interface IUserService {

    public User registerUser(CommonUser commonUser, MultipartFile imgFile) throws UserAlreadyPresentException;
    public User editProfile(User user)throws UserNotFound;

    public User getUserDetails(String email) throws UserNotFound;

    public String deleteAccount(String email) throws UserNotFound;

    public String changePassword(UserDTO userDTO);

    public User changeImage(MultipartFile imgFile,String email)throws UserNotFound;

}
