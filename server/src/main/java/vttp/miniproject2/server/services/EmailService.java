package vttp.miniproject2.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class EmailService {
    @Autowired
    private JavaMailSender emailSender;

    @Value("${email.origin}")
    private String emailOrigin;

    public void sendEmail(
      String to, String subject, String text) {
        
        SimpleMailMessage message = new SimpleMailMessage(); 
        message.setFrom(emailOrigin);
        message.setTo(to); 
        message.setSubject(subject); 
        message.setText(text);

        emailSender.send(message);
        
    }
}
