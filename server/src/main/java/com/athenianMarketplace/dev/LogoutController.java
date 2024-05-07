package com.athenianMarketplace.dev;

import com.athenianMarketplace.dev.AuthKeys.AuthKeyRepository;
import com.athenianMarketplace.dev.Responses.ServerResponse;
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
    private AuthKeyRepository authKeyRepository;

    @PostMapping("/destroyAuthKey")
    public @ResponseBody ServerResponse logout(@RequestParam Integer authKeyId){
        if(authKeyRepository.existsById(authKeyId)){
            authKeyRepository.deleteById(authKeyId);
            return(new ServerResponse(0,"Success. User logged out."));
        }
        return(new ServerResponse(0, "Failed. Auth Key is invalid."));
    }
}
