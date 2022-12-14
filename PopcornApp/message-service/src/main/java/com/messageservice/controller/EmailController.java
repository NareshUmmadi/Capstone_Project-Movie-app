package com.messageservice.controller;

import com.messageservice.model.Email;
import com.messageservice.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class EmailController {
    @Autowired
    private EmailService service;

    @PostMapping("/send")
    public ResponseEntity<?> send(@RequestBody Email email){
        Map<String, Object> model = new HashMap<>();
//        model.put("name", email.getName());
        model.put("msgBody", email.getMsgBody());
        return new ResponseEntity<>(service.sendHtmlMessage(email, model), HttpStatus.OK);
    }
}
