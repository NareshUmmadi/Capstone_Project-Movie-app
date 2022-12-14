package com.app.rabbitmq;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig{
    @Bean
    public DirectExchange getExchange(){
        return new DirectExchange("authExchange");
    }

    @Bean
    public Queue getRegisterQueue(){
        return new Queue("authQueue");
    }

    @Bean
    public Queue getDeleteQueue(){
        return new Queue("authDeleteQueue");
    }

    @Bean
    public Queue getChangePasswordQueue(){
        return new Queue("authPasswordQueue");
    }

    @Bean
    public Jackson2JsonMessageConverter getJsonConverter(){
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate getMyTemplate(ConnectionFactory connectionFactory){
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(getJsonConverter());
        return rabbitTemplate;
    }

    @Bean
    public Binding getBinding(DirectExchange exchange){
        return BindingBuilder.bind(getRegisterQueue()).to(exchange).with("authRouting");
    }

    @Bean
    public Binding getBindingForDeleteQueue(DirectExchange exchange){
        return BindingBuilder.bind(getDeleteQueue()).to(exchange).with("authDeleteRouting");
    }
    @Bean
    public Binding getBindingForPasswordChangeQueue(DirectExchange exchange){
        return BindingBuilder.bind(getChangePasswordQueue()).to(exchange).with("authPasswordRouting");
    }
}
