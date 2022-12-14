package com.app.repository;


import com.app.dto.CommonUser;
import com.app.dto.UserDTO;
import com.app.model.*;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.multipart.MultipartFile;
import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
@ExtendWith(SpringExtension.class)
@DataMongoTest
public class UserRepositoryTest {
    @Autowired
    private UserRepository userRepository;
    private User user;
    private Trailer trailer;
    private Movie movie;
    private Subscription subscription;
    private Image image;
    private MultipartFile imgFile;
    private CommonUser commonUser;
    private UserDTO userDTO;

    private Movie newMovie= new Movie();
    @BeforeEach
    public void setUp() {
        userDTO = new UserDTO("12345","Abc@123");
        subscription = new Subscription(SubType.SILVER, null, null);
        image = new Image("hi", null);
        imgFile = null;
        movie = new Movie(" /qDA95ebiy3W3m8hTRB3xZNZVVBM.jpg", "In 1993, six months after the events of The Silence of the Lambs, FBI Agent Clarice \n" +
                " Starling returns to the field to pursue serial murderers and sexual predators while navigating the \n" +
                " high stakes political world of Washington, D.C.", 145, "18-02-2007", "/7OFxU0bBO0HDL4klXmM1ahJPbv8.jpg", 78d, "hello");
        user = new User("abc@123", "abc", image, subscription, new ArrayList<>(),new ArrayList<>(), 300d);
        commonUser = new CommonUser("abc@123", "abc", "12345");
        commonUser.setProfileImage(image);
        commonUser.setSubscription(subscription);
        trailer=new Trailer("T001","hello");
    }
    @AfterEach
    public void clear() {
        movie = null;
        subscription = null;
        image = null;
        user = null;
        commonUser = null;
        trailer=null;
        userRepository.deleteAll();
    }
    @Test
    public void findById(){
        userRepository.insert(user);
        User result=userRepository.findById(user.getEmail()).get();
        assertEquals(result,user);
    }

    @Test
    public void deleteUser(){
        userRepository.insert(user);
        userRepository.deleteById(user.getEmail());
        assertEquals(Optional.empty(),userRepository.findById(user.getEmail()));
    }

    @Test
    public void insertUser(){
        userRepository.insert(user);
        User result=userRepository.findById(user.getEmail()).get();
        assertEquals(user,result);
    }
    @Test
    public void updateUser(){
        userRepository.insert(user);
        user.setCredits(500d);
        userRepository.save(user);
        User result=userRepository.findById(user.getEmail()).get();
        assertEquals(500d,result.getCredits());
    }
}
