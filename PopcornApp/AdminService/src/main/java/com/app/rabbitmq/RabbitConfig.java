package com.app.rabbitmq;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {
    @Bean
    public DirectExchange getExchange(){
        return new DirectExchange("messageExchange");
    }

    @Bean
    public Queue getQueue(){
        return new Queue("messageQueue");
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
    public Binding getBinding(Queue queue, DirectExchange exchange){
        return BindingBuilder.bind(queue).to(exchange).with("messageRouting");
    }

}
