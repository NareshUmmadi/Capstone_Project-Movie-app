package com.app.controller;


import com.app.dto.CommonUser;
import com.app.dto.UserDTO;
import com.app.exception.UserAlreadyPresentException;
import com.app.exception.UserNotFound;
import com.app.model.User;
import com.app.service.IUserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController()
@CrossOrigin("*")
@RequestMapping("user")
public class UserController {

    @Autowired
    IUserService userService;
    @Autowired
    ObjectMapper objectMapper;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser( @RequestParam("image")MultipartFile file,@RequestParam("user")String userJson) throws UserAlreadyPresentException, JsonProcessingException {
        CommonUser commonUser = objectMapper.readValue(userJson, CommonUser.class);
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.registerUser(commonUser,file));
    }
    
    @GetMapping("/user/{email}")
    public ResponseEntity<?> getUserDetails(@PathVariable("email")String email) throws UserNotFound {
        return ResponseEntity.ok(userService.getUserDetails(email));
    }

    @PutMapping("/user")
    public ResponseEntity<?> updateUserDetails(@RequestBody User user) throws UserNotFound {
        return ResponseEntity.ok(userService.editProfile(user));
    }

    @DeleteMapping("/user/{email}")
    public ResponseEntity<?> deleteAccount(@PathVariable("email")String email) throws UserNotFound {
        return ResponseEntity.ok(userService.deleteAccount(email));
    }

    @PutMapping("/user/details")
    public ResponseEntity<?> updatePassword(@RequestBody UserDTO userDTO){
        System.out.println(userDTO);
        return ResponseEntity.ok(userService.changePassword(userDTO));
    }

    @PutMapping("/user/{email}")
    public ResponseEntity<?> updateAvatar(@PathVariable("email")String email,@RequestParam("image")MultipartFile file) throws UserNotFound {
        return ResponseEntity.ok(userService.changeImage(file,email));
    }

}
