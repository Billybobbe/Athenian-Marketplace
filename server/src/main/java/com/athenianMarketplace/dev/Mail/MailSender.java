package com.athenianMarketplace.dev.Mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class MailSender{
    @Autowired
    private JavaMailSender javaMailSender;

    public static void sendEmail(String to, String title, String message){
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(to);
        mailMessage.setFrom("athenianslist@noreply.com");
        mailMessage.setSubject(title);
        mailMessage.setText(message);
    }
}
