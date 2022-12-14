package com.messageservice.rabbitMQ;

import com.messageservice.model.Email;
import com.messageservice.service.EmailService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class Consumer {

    @Autowired
    private EmailService emailService;

    @RabbitListener(queues = "messageQueue")
    public void getMsgFromAuthApp(Email email){
//        emailService.sendEmail(email);
        Map<String, Object> model = new HashMap<>();
        model.put("name", email.getName());
        model.put("msgBody", email.getMsgBody());
        emailService.sendHtmlMessage(email, model);
    }
}
