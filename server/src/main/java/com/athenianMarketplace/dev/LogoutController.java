package com.athenianMarketplace.dev;

import com.athenianMarketplace.dev.AuthKeys.AuthKeyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/logout")
public class LogoutController {
    @Autowired
    AuthKeyRepository authKeyRepository;

    @PostMapping("/destroyAuthKey")
    public @ResponseBody String logout(@RequestParam Integer authKeyId){
        if(authKeyRepository.existsById(authKeyId)){
            authKeyRepository.deleteById(authKeyId);
            return("Success. User logged out.");
        }
        return("Failed. Auth Key is invalid.");
    }
}
