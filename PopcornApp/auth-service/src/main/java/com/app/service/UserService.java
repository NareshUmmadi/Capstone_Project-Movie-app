package com.app.service;

import com.app.JwtTokenGenerator.ITokenGenerator;
import com.app.exception.UserAlreadyExistException;
import com.app.exception.InvalidCredentialsException;
import com.app.exception.UserNotFoundException;
import com.app.model.Email;
import com.app.model.User;
import com.app.rabbitmq.Producer;
import com.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.Map;

@Service
public class UserService implements IUserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ITokenGenerator tokenGenerator;
    @Autowired
    private Producer producer;

    int generatedOTP;

    @Override
    public User registerUser(User user) throws UserAlreadyExistException, MalformedURLException {
        if(userRepository.findById(user.getEmail()).isPresent())
            throw new UserAlreadyExistException();
        URL url = new URL("http://localhost:4200/user/verify/"+user.getEmail());
        Email email = new Email();
        email.setRecipient(user.getEmail());
        email.setSubject("Email Verification Link");
        email.setMsgBody("Please Verify Your Email Id: "+ url);
        email.setAttachment("Empty");
        producer.sendMessageToMessageApp(email);
        return userRepository.save(user);
    }

    @Override
    public Map<String,String> login(User user) throws InvalidCredentialsException, UserNotFoundException {
        User repoUser= userRepository.findById(user.getEmail()).orElseThrow(UserNotFoundException::new);
        System.out.println("user fetched is "+repoUser);
        if(!repoUser.getPassword().equals(user.getPassword()))
            throw new InvalidCredentialsException();
        return tokenGenerator.generate_Token(repoUser);
    }

    @Override
    public boolean deleteAccount(String email) throws UserNotFoundException {
        User user = userRepository.findById(email).orElseThrow(UserNotFoundException::new);
        userRepository.deleteById(email);
        Email sendEmail = new Email();
        sendEmail.setRecipient(user.getEmail());
        sendEmail.setSubject("Delete Account");
        sendEmail.setMsgBody("Your Account with Email Id: "+email+" Deleted Successfully");
        sendEmail.setAttachment("Empty");
        producer.sendMessageToMessageApp(sendEmail);
        return true;
    }

    @Override
    public User verifyPassword(User user) throws InvalidCredentialsException, UserNotFoundException {
        User repUser = userRepository.findById(user.getEmail()).orElseThrow(UserNotFoundException::new);
        if(!repUser.getPassword().equals(user.getPassword()))
            throw new InvalidCredentialsException();
        repUser.setPassword("");
        return repUser;
    }

    @Override
    public User changePassword(User user) throws UserNotFoundException {
        User repUser = userRepository.findById(user.getEmail()).orElseThrow(UserNotFoundException::new);
        repUser.setPassword(user.getPassword());
        Email sendEmail = new Email();
        sendEmail.setRecipient(user.getEmail());
        sendEmail.setSubject("Change Password");
        sendEmail.setMsgBody("Your Account's Password With Email Id: "+repUser.getEmail()+" Has Been Changed \n " +
                "Your New Password Is: "+user.getPassword());
        sendEmail.setAttachment("Empty");
        producer.sendMessageToMessageApp(sendEmail);
        return userRepository.save(repUser);
    }

    @Override
    public User activateAccount(String email) throws UserNotFoundException {
        User repUser=userRepository.findById(email).orElseThrow(UserNotFoundException::new);
        repUser.setIsVerified(true);
        Email sendEmail = new Email();
        sendEmail.setRecipient(repUser.getEmail());
        sendEmail.setSubject("Account Activated");
        sendEmail.setMsgBody("Your Account Is Activated Successfully With Email Id: "+repUser.getEmail()+" \n And Password: "+repUser.getPassword());
        sendEmail.setAttachment("Empty");
        producer.sendMessageToMessageApp(sendEmail);
        return userRepository.save(repUser);
    }

    @Override
    public boolean resendVerificationEmail(String email) throws MalformedURLException {
        URL url = new URL("http://localhost:4200/user/verify/"+email);
        Email sendEmail = new Email();
        sendEmail.setRecipient(email);
        sendEmail.setSubject("Email Verification Link");
        sendEmail.setMsgBody("Please verify your email: "+ url);
        sendEmail.setAttachment("Empty");
        producer.sendMessageToMessageApp(sendEmail);
        return true;
    }

    @Override
    public User forgotPassword(String email) throws UserNotFoundException {
        User user = userRepository.findById(email).orElseThrow(UserNotFoundException::new);
        Email emailToSend = new Email();
        emailToSend.setRecipient(email);
        emailToSend.setSubject("Forgot password");
        String body="Your password is : "+user.getPassword();
        emailToSend.setMsgBody(body);
        producer.sendMessageToMessageApp(emailToSend);
        return user;
    }

}
