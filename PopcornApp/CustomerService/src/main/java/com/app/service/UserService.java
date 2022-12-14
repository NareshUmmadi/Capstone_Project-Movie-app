package com.app.service;

import com.app.dto.CommonUser;
import com.app.dto.UserDTO;
import com.app.exception.UserAlreadyPresentException;
import com.app.exception.UserNotFound;
import com.app.model.Image;
import com.app.model.Transaction;
import com.app.model.User;
import com.app.rabbitmq.ProducerUserAuth;
import com.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class UserService implements IUserService{
    @Autowired
    UserRepository userRepository;
    @Autowired
    ProducerUserAuth producer;

    @Override
    public User registerUser(CommonUser commonUser, MultipartFile imgFile) throws UserAlreadyPresentException {
        if(userRepository.findById(commonUser.getEmail()).isPresent())
            throw new UserAlreadyPresentException();
        Image image;
        try {
             image = new Image(imgFile.getOriginalFilename(), imgFile.getBytes() );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        User user = new User(commonUser.getEmail(), commonUser.getUserName(), commonUser.getProfileImage(), commonUser.getSubscription());
        user.setProfileImage(image);

        Transaction transaction = new Transaction(new Date(), "Joining Bonus", "Credit", 300d);
        List<Transaction> purchaseHistory = user.getPurchaseHistory();
        purchaseHistory.add(transaction);
        user.setPurchaseHistory(purchaseHistory);

        UserDTO userDTO = new UserDTO(  commonUser.getEmail(),commonUser.getPassword());
        userRepository.save(user);
        producer.sendDataToUserAppQueue(userDTO);
        return user;
    }

    @Override
    public User editProfile(User user) throws UserNotFound {
        userRepository.findById(user.getEmail()).orElseThrow(UserNotFound::new);
        return userRepository.save(user);
    }

    @Override
    public User getUserDetails(String email) throws UserNotFound {
        return userRepository.findById(email).orElseThrow(UserNotFound::new);
    }

    @Override
    public String deleteAccount(String email) throws UserNotFound {
        userRepository.findById(email).orElseThrow(UserNotFound::new);
        userRepository.deleteById(email);
        producer.deleteUserDataInAuthApp(email);
        return "User deleted successfully";
    }

    @Override
    public String changePassword(UserDTO userDTO) {
     producer.changeUserPassword(userDTO);
        return "Password changed successfully";
    }

    @Override
    public User changeImage(MultipartFile imgFile, String email) throws UserNotFound {
        User repUser=userRepository.findById(email).orElseThrow(UserNotFound::new);

        try {
            repUser.setProfileImage(new Image(imgFile.getOriginalFilename(), imgFile.getBytes()));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return userRepository.save(repUser);
    }

}
