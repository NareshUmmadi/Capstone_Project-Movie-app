package com.app.rabbitmq;

import com.app.model.Email;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Producer {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Autowired
    private DirectExchange directExchange;

    public void sendMessageToMessageApp(Email email){
        rabbitTemplate.convertAndSend(directExchange.getName(), "messageRouting", email);
    }
}
