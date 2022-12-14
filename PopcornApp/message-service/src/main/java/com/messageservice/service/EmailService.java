package com.messageservice.service;

import com.messageservice.model.Email;

import java.util.Map;

public interface EmailService {

    public String sendEmail(Email email);

    public String sendHtmlMessage(Email email, Map<String, Object> model);
}
