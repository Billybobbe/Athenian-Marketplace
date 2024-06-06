package com.athenianMarketplace.dev;

import com.athenianMarketplace.dev.AuthKeys.AuthKeyRepository;
import com.athenianMarketplace.dev.Requests.UserByAuthRequest;
import com.athenianMarketplace.dev.Requests.UserRequest;
import com.athenianMarketplace.dev.Responses.UserResponse;
import com.athenianMarketplace.dev.Users.User;
import com.athenianMarketplace.dev.Users.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;

@Controller
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthKeyRepository authKeyRepository;

    @PostMapping("/{id}")
    public @ResponseBody UserResponse getUser(@RequestBody UserRequest request){
        if(!authKeyRepository.existsById(request.authKey)){
            return(new UserResponse(1, "Failed. Auth key invalid."));
        }
        if(!userRepository.existsById(request.userId)){
            return(new UserResponse(1, "Failed. UserId invalid."));
        }
        User foundUser = userRepository.findById(request.userId).get();
        String month = foundUser.getJoinDate().getMonth().toString();
        month = (month!=null) ? month.substring(0, 1) + month.substring(1).toLowerCase() : ""; //make all fancy capitalization unless not recorded for some reason, then just include as empty string
        return(new UserResponse(0, "Success.", foundUser.getName(), foundUser.getEmail(), foundUser.getAccountPhotoId(), month + " " + foundUser.getJoinDate().getYear()));
    }
    @PostMapping("/authKeyUser")
    public @ResponseBody UserResponse getByAuthKey(@RequestBody UserByAuthRequest request){
        if(request.authKey==null || !authKeyRepository.existsById(request.authKey)){
            return(new UserResponse(1, "Failed. Auth key invalid."));
        }
        User authKeyUser = userRepository.findById(authKeyRepository.findById(request.authKey).get().getUserId()).get();
        String month = authKeyUser.getJoinDate().getMonth().toString();
        month = (month!=null) ? month.substring(0, 1) + month.substring(1).toLowerCase() : "";
        return(new UserResponse(0, "Success.", authKeyUser.getName(), authKeyUser.getEmail(), authKeyUser.getAccountPhotoId(), month + " " + authKeyUser.getJoinDate().getYear()));
    }

    @GetMapping("/getPhoto")
    public ResponseEntity<Resource> getPhoto(@RequestParam String imageID){
        Path p = Paths.get("./res/userImages/" + imageID + ".jpg");
        if(imageID.equals("undefined")){
            p = Paths.get("./res/utilImages/noImage.jpg");
        }
        Resource r;
        try {
            r = new UrlResource(p.toUri());
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(r);
    }


}