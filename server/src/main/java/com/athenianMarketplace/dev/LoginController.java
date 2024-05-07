package com.athenianMarketplace.dev;

import com.athenianMarketplace.dev.AuthKeys.AuthKey;
import com.athenianMarketplace.dev.AuthKeys.AuthKeyRepository;
import com.athenianMarketplace.dev.Responses.ServerResponse;
import com.athenianMarketplace.dev.Users.User;
import com.athenianMarketplace.dev.Users.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@Controller
@RequestMapping("/login")
public class LoginController {
    @Autowired
    private AuthKeyRepository authKeyRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/getAuthKey")
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
}
