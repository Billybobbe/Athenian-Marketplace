package com.athenianMarketplace.dev;

import com.athenianMarketplace.dev.AuthKeys.AuthKey;
import com.athenianMarketplace.dev.AuthKeys.AuthKeyRepository;
import com.athenianMarketplace.dev.Users.User;
import com.athenianMarketplace.dev.Users.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDateTime;

@Controller
@RequestMapping("/login")
public class LoginController {
    @Autowired
    AuthKeyRepository authKeyRepository;
    @Autowired
    UserRepository userRepository;

    @PostMapping("/getAuthKey")
    public @ResponseBody String getAuthKey(@RequestParam String email, @RequestParam String password){
        User requestedUser = userRepository.findByemail(email);
        if(requestedUser==null){
            return("Failed. Email address does not exist");
        }
        if(!requestedUser.getPassword().equals(password)){
            return("Failed. Email address and password do not match");
        }

        AuthKey key = new AuthKey();
        key.setUserId(requestedUser.getId());
        key.setExpiration(LocalDateTime.now());
        key = authKeyRepository.save(key);
        return(key.getKeyId().toString());
    }
}
