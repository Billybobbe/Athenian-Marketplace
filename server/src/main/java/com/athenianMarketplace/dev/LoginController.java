package com.athenianMarketplace.dev;

import com.athenianMarketplace.dev.AuthKeys.AuthKey;
import com.athenianMarketplace.dev.AuthKeys.AuthKeyRepository;
import com.athenianMarketplace.dev.Mail.MailSender;
import com.athenianMarketplace.dev.Responses.ServerResponse;
import com.athenianMarketplace.dev.Users.User;
import com.athenianMarketplace.dev.Users.UserRepository;
import com.athenianMarketplace.dev.VerifyRequests.VerifyRequest;
import com.athenianMarketplace.dev.VerifyRequests.VerifyRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@Controller
@RequestMapping("/login")
public class LoginController {
    @Autowired
    private AuthKeyRepository authKeyRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private VerifyRequestRepository verifyRequestRepository;

    @PostMapping("/getAuthKey")
    public @ResponseBody ServerResponse getAuthKey(@RequestParam String email, @RequestParam String password){
        User requestedUser = userRepository.findByEmail(email);
        if(requestedUser==null){
            return(new ServerResponse(1, "Failed. Email address does not exist"));
        }
        if(!requestedUser.getPassword().equals(password)){
            return(new ServerResponse(1, "Failed. Email address and password do not match"));
        }

        AuthKey key = new AuthKey();
        key.setUserId(requestedUser.getId());
        key.setExpiration(LocalDateTime.now());
        key = authKeyRepository.save(key);
        return(new ServerResponse(0, key.getKeyId().toString()));
    }
    @PostMapping("/forgotPassword")
    public @ResponseBody ServerResponse forgotPassword(@RequestParam String email){
        if(userRepository.findByEmail(email)==null){
            return(new ServerResponse(1, "Failed. Email address does not exist."));
        }
        SecureRandom randomGenerator = new SecureRandom();
        if(verifyRequestRepository.findByemail(email)==null){
            VerifyRequest verifyRequest = new VerifyRequest();
            Integer code = randomGenerator.nextInt(1000000);
            verifyRequest.setCode(code);
            verifyRequestRepository.save(verifyRequest);
            MailSender.sendEmail(email, "Authentication code for password reset", "Your authentication code is " + code + ". Do not share this with anyone.");
            return(new ServerResponse(0, "Success."));
        }
        if(Duration.between(LocalDateTime.now(), verifyRequestRepository.findByemail(email).getExpiration()).toMinutes() < 1){
            return(new ServerResponse(1, "Failed. Authentication code cannot be regenerated more than once per minute."));
        }
        VerifyRequest existingVerifyRequest = verifyRequestRepository.findByemail(email);
        Integer code = randomGenerator.nextInt(1000000);
        existingVerifyRequest.setCode(code);
        MailSender.sendEmail(email, "Authentication code for password reset", "Your authentication code is " + code + ". Do not share this with anyone.");
        return(new ServerResponse(0, "Success."));
    }
    @PostMapping("/forgotPassword/reset")
    public @ResponseBody ServerResponse forgotPasswordReset(@RequestParam String email, @RequestParam String password, @RequestParam Integer authCode){
        if(userRepository.findByEmail(email) == null){
            return(new ServerResponse(1, "Failed. Account does not exist."));
        }
        VerifyRequest existingRequest = verifyRequestRepository.findByemail(email);
        if(existingRequest==null || Duration.between(LocalDateTime.now(), existingRequest.getExpiration()).toMinutes()>15){
            return(new ServerResponse(1, "Failed. Authentication code does not exist or is expired."));
        }
        if(existingRequest.getCode()!=authCode){
            return(new ServerResponse(1, "Failed. Authentication code does not match."));
        }
        User existingUser = userRepository.findByEmail(email);
        existingUser.setPassword(password);
        verifyRequestRepository.delete(existingRequest);
        List<AuthKey> activeKeys = authKeyRepository.findAllByUserId(existingUser.getId());
        for(AuthKey key : activeKeys){
            authKeyRepository.delete(key);
        }
        return(new ServerResponse(0, "Success."));
    }
}
