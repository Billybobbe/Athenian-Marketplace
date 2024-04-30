package com.athenianMarketplace.dev;

import com.athenianMarketplace.dev.Users.User;
import com.athenianMarketplace.dev.Users.UserRepository;
import com.athenianMarketplace.dev.VerifyRequests.VerifyRequest;
import com.athenianMarketplace.dev.VerifyRequests.VerifyRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.security.SecureRandom;
import java.time.Duration;
import java.time.LocalDateTime;

@Controller
@RequestMapping("/create-account")
public class AccountCreationController{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VerifyRequestRepository verifyRequestRepository;

    SecureRandom randomGenerator = new SecureRandom();

    @PostMapping("/registerAccountForVerification")
    public @ResponseBody String registerAccountVerification(@RequestParam String email){
        if(!email.contains("@athenian.org")){
            return("Failed. Email not part of Athenian domain.");
        }

        if(userRepository.findByemail(email)!=null){ //Account does not exist yet
            VerifyRequest v = verifyRequestRepository.findByemail(email);
            if(v!=null){
                if(Duration.between(LocalDateTime.now(), v.getExpiration()).toMinutes()>1){ //If older than a minute we can change the code
                    Integer code = randomGenerator.nextInt(1000000);
                    v.setCode(code);
                    v.setExpiration(LocalDateTime.now());
                    return("Success.");
                }
                else{
                    return("Failed. Verification key cannot be regenerated more than once per minute.");
                }
            }
            else {
                VerifyRequest newRequest = new VerifyRequest();
                newRequest.setEmail(email);
                newRequest.setExpiration(LocalDateTime.now());
                newRequest.setCode(randomGenerator.nextInt(1000000));
                verifyRequestRepository.save(newRequest);
                return ("Success.");
            }
        }
        else{
            return("Failed. Email already associated with existing account.");
        }
    }
    @PostMapping("/registerAccount")
    public @ResponseBody String registerAccount(@RequestParam String email, @RequestParam Integer code,
                                                @RequestParam String password, @RequestParam String name,
                                                @RequestParam BufferedImage photo){
        VerifyRequest v = verifyRequestRepository.findByemail(email);
        if(v!=null && v.getCode()==code && Duration.between(LocalDateTime.now(), v.getExpiration()).toMinutes()<=15){
            User newUser = new User();
            newUser.setPassword(password);
            newUser.setName(name);
            newUser.setAccountPhotoId(saveImage(photo));
            userRepository.save(newUser);
            verifyRequestRepository.delete(v);
            return("Success.");
        }
        else {
            return("Failed. Code does not match or email not registered.");
        }
    }
    private String saveImage(BufferedImage image){
        String imageName = ""; //do something to randomly generate it
        File imageFile = new File(imageName + ".jpg");
        try{
            ImageIO.write(image, "jpg", imageFile);
        } catch(IOException e){
            System.out.println("Failed to save image :(");
        }
        return imageName;
    }
}
