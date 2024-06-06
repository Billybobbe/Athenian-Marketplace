package com.athenianMarketplace.dev;

import com.athenianMarketplace.dev.AuthKeys.AuthKeyRepository;
import com.athenianMarketplace.dev.Requests.LogoutRequest;
import com.athenianMarketplace.dev.Responses.ServerResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/logout")
public class LogoutController {
    @Autowired
    private AuthKeyRepository authKeyRepository;

    @PostMapping("/destroyAuthKey")
    public @ResponseBody ServerResponse logout(@RequestBody LogoutRequest request){
        if(request.authKey != null && authKeyRepository.existsById(request.authKey)){
            authKeyRepository.deleteById(request.authKey);
            return(new ServerResponse(0,"Success. User logged out."));
        }
        return(new ServerResponse(0, "Failed. Auth Key is invalid."));
    }
}
