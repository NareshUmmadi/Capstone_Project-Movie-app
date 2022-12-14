package com.messageservice.rabbitMQ;

import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class QueueMessageConfig {

    @Bean
    public Jackson2JsonMessageConverter getProducerJackson(){
        return new Jackson2JsonMessageConverter();
    }
}
