package com.athenianMarketplace.dev.Mail;

import com.mailjet.client.ClientOptions;
import com.mailjet.client.MailjetClient;
import com.mailjet.client.MailjetRequest;
import com.mailjet.client.MailjetResponse;
import com.mailjet.client.errors.MailjetException;
import com.mailjet.client.resource.Contact;
import com.mailjet.client.resource.Emailv31;
import com.mailjet.client.transactional.SendContact;
import com.mailjet.client.transactional.SendEmailsRequest;
import com.mailjet.client.transactional.TransactionalEmail;
import com.mailjet.client.transactional.response.SendEmailsResponse;
import com.mysql.cj.xdevapi.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class SiteMailSender {
    @Autowired
    private JavaMailSender javaMailSender;

    public static void sendEmail(String to, String title, String message){

        MailjetClient client = new MailjetClient(ClientOptions.builder().apiKey("8d85e9eedf93be1284a77fadfeae5063").apiSecretKey("960cab931336076c2ce2650c9c5b00da").build());
        TransactionalEmail emailMsg = TransactionalEmail
                .builder()
                .to(new SendContact(to, ""))
                .from(new SendContact("24dmontgomery@athenian.org", "athenianslist"))
                .htmlPart(message)
                .subject(title).build();

        SendEmailsRequest request = SendEmailsRequest.builder().message(emailMsg).build();
        try {
            SendEmailsResponse response = request.sendWith(client);
            System.out.println(response.toString());
        } catch (MailjetException e) {
            throw new RuntimeException(e);
        }
        /*
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(to);
        mailMessage.setFrom("athenianslist@noreply.com");
        mailMessage.setSubject(title);
        mailMessage.setText(message);
        javaMailSender.send(mailMessage);
         */
    }
}
