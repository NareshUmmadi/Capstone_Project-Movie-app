package com.app.rabbitmq;

import com.app.dto.UserDTO;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProducerUserAuth {
    @Autowired
    RabbitTemplate rabbitTemplate;

    @Autowired
    DirectExchange directExchange;

    public void sendDataToUserAppQueue(UserDTO userDto){
        rabbitTemplate.convertAndSend(directExchange.getName(),"authRouting",userDto);
    }
    public void deleteUserDataInAuthApp(String email){
        rabbitTemplate.convertAndSend(directExchange.getName(),"authDeleteRouting",email);
    }

    public void  changeUserPassword(UserDTO userDTO){
        rabbitTemplate.convertAndSend(directExchange.getName(),"authPasswordRouting",userDTO);
    }

}
