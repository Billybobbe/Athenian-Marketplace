package com.athenianMarketplace.dev;

import com.athenianMarketplace.dev.Mail.SiteMailSender;
import com.athenianMarketplace.dev.Requests.AccountCreationRequest;
import com.athenianMarketplace.dev.Responses.ServerResponse;
import com.athenianMarketplace.dev.Users.User;
import com.athenianMarketplace.dev.Users.UserRepository;
import com.athenianMarketplace.dev.VerifyRequests.VerifyRequest;
import com.athenianMarketplace.dev.VerifyRequests.VerifyRequestRepository;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Map;
import java.util.UUID;

@Controller
@RequestMapping("/create-account")
public class AccountCreationController{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private VerifyRequestRepository verifyRequestRepository;
    @Autowired
    private SiteMailSender siteMailSender;

    SecureRandom randomGenerator = new SecureRandom();

    @PostMapping("/registerAccountForVerification")
    public synchronized @ResponseBody ServerResponse registerAccountVerification(@RequestBody Map<String, String> params){ //1 thread so no table corruption
        String email = params.get("email");
        if(!email.endsWith("@athenian.org")){
            System.out.println("error 1");
            return(new ServerResponse(1,"Failed. Email not part of Athenian domain."));
        }

        if(userRepository.findByEmail(email)==null){ //Account does not exist yet
            VerifyRequest v = verifyRequestRepository.findByemail(email);
            if(v!=null){
                if(Duration.between(v.getExpiration(), LocalDateTime.now()).toMinutes()>1){ //If older than a minute we can change the code
                    Integer code = randomGenerator.nextInt(1000000);
                    v.setCode(code);
                    v.setExpiration(LocalDateTime.now());
                    verifyRequestRepository.save(v);
                    siteMailSender.sendEmail(email, "Authentication Key for AtheniansList", "Your authentication key is " + code +". Do not share this with anyone.");
                    return(new ServerResponse(0,"Success."));
                }
                else{
                    return(new ServerResponse(1, "Failed. Verification key cannot be regenerated more than once per minute."));
                }
            }
            else {
                VerifyRequest newRequest = new VerifyRequest();
                newRequest.setEmail(email);
                newRequest.setExpiration(LocalDateTime.now());
                Integer code = randomGenerator.nextInt(1000000);
                newRequest.setCode(code);
                verifyRequestRepository.save(newRequest);
                siteMailSender.sendEmail(email, "Authentication Key for AtheniansList", "Your authentication key is " + code +". Do not share this with anyone.");
                return(new ServerResponse(0, "Success."));
            }
        }
        else{
            return(new ServerResponse(1, "Failed. Email already associated with existing account."));
        }
    }
    @PostMapping("/registerAccount")
    public @ResponseBody ServerResponse registerAccount(@RequestBody AccountCreationRequest request){
        VerifyRequest v = verifyRequestRepository.findByemail(request.email);
        if(userRepository.findByEmail(request.email)!=null){
            return(new ServerResponse(1, "Failed. User already exists."));
        }
        if(v!=null && request.verifyCode !=null && v.getCode()==request.verifyCode && Duration.between(v.getExpiration(), LocalDateTime.now()).toMinutes()<=15){
            verifyRequestRepository.delete(v);
            User newUser = new User();
            newUser.setEmail(request.email);
            newUser.setPassword(request.password);
            newUser.setName(request.name);
            newUser.setJoinDate(LocalDateTime.now());
            newUser = userRepository.saveAndFlush(newUser);
            newUser.setAccountPhotoId(saveImage(request.photo)); // we do this after so the thread doesn't hang and have the potential to add multiple entries at once.
            System.out.println(newUser.getId());
            userRepository.save(newUser);
            return(new ServerResponse(0, "Success."));
        }
        else {
            return(new ServerResponse(1, "Failed. Code does not match or email not registered."));
        }
    }
    private String saveImage(String dataURL){
        if(dataURL == null){
            return null;
        }
        byte[] imageData = Base64.decodeBase64(dataURL.substring(dataURL.indexOf("base64,") + "base64,".length()));
        BufferedImage image = new BufferedImage(64, 64, BufferedImage.TYPE_INT_RGB);
        try {
            image = ImageIO.read(new ByteArrayInputStream(imageData));
        }
        catch(IOException e){
            System.out.println("Failed to save image :(");
        }
        String imageName = UUID.randomUUID().toString();
        File imageFile = new File("./res/userImages/" + imageName + ".jpg");
        try{
            ImageIO.write(image, "jpg", imageFile);
        } catch(IOException e){
            System.out.println("Failed to save image :(");
        }
        return imageName;
    }
}
