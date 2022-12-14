package com.messageservice.service;


import com.messageservice.model.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;


import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import javax.mail.internet.MimeMessage;


@Service
public class EmailServiceImpl implements EmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    Configuration config;
    @Value("${spring.mail.username}")
    private String sender;

    @Override
    public String sendEmail(Email email){
        try{
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setFrom(sender);
            msg.setTo(email.getRecipient());
            msg.setSubject(email.getSubject());
            msg.setText(email.getMsgBody());
            javaMailSender.send(msg);
            return "Mail Send Successfully";
        }
        catch (Exception ex){
            return "Error while sending mail";
        }
    }

    public String sendHtmlMessage(Email email, Map<String, Object> model){
        MimeMessage message = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                StandardCharsets.UTF_8.name());
        Template t = config.getTemplate("email-template.ftl");
        String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);
        helper.setTo(email.getRecipient());
        helper.setText(html, true);
        helper.setSubject(email.getSubject());
        helper.setFrom(sender);
        javaMailSender.send(message);
        return "done";
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return "fail";
        }
    }
}
