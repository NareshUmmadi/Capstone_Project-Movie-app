package com.app.rabbitmq;

import com.app.exception.UserAlreadyExistException;
import com.app.exception.UserNotFoundException;
import com.app.model.User;
import com.app.service.IUserService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.net.MalformedURLException;

@Component
public class Consumer {

    @Autowired
    IUserService userService;

    @RabbitListener(queues = "authQueue")
    public void registerUser(User user) throws UserAlreadyExistException, MalformedURLException {
        userService.registerUser(user);
    }

    @RabbitListener(queues = "authDeleteQueue")
    public void deleteUser(String email) throws UserNotFoundException {
        userService.deleteAccount(email);
    }

    @RabbitListener(queues = "authPasswordQueue")
    public void changePassword(User user) throws UserNotFoundException {
        userService.changePassword(user);
    }
}
