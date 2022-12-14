package com.app.controller;

import com.app.exception.InvalidCredentialsException;
import com.app.exception.UserNotFoundException;
import com.app.model.User;
import com.app.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.MalformedURLException;

@RestController
@CrossOrigin("*")
@RequestMapping("auth")
public class UserController {

    @Autowired
    private IUserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) throws UserNotFoundException, InvalidCredentialsException {
        return ResponseEntity.ok(userService.login(user));
    }

    @PostMapping("/user/verify/{email}")
    public ResponseEntity<?> activateAccount(@PathVariable("email") String email) throws UserNotFoundException {
        return ResponseEntity.ok(userService.activateAccount(email));
    }

    @PostMapping("/user/forgot/{email}")
    public ResponseEntity<?> forgotPassword(@PathVariable("email") String email) throws UserNotFoundException {
        return ResponseEntity.ok(userService.forgotPassword(email));
    }

    @PostMapping("/user/verify")
    public ResponseEntity<?> verifyPassword(@RequestBody User user) throws UserNotFoundException, InvalidCredentialsException {
        return ResponseEntity.ok(userService.verifyPassword(user));
    }

    @PostMapping("/user/resend/{email}")
    public ResponseEntity<?> resendVerification(@PathVariable String email) throws MalformedURLException {
        return ResponseEntity.ok(userService.resendVerificationEmail(email));
    }
}
