package com.athenianMarketplace.dev;

import com.athenianMarketplace.dev.AuthKeys.AuthKeyRepository;
import com.athenianMarketplace.dev.Responses.ServerResponse;
import com.athenianMarketplace.dev.Responses.UserResponse;
import com.athenianMarketplace.dev.Users.User;
import com.athenianMarketplace.dev.Users.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

@Controller
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthKeyRepository authKeyRepository;

    @PostMapping("/{id}")
    public @ResponseBody UserResponse getUser(@RequestParam Integer authKey, @PathVariable Integer userId){
        if(!authKeyRepository.existsById(authKey)){
            return(new UserResponse(1, "Failed. Auth key invalid."));
        }
        if(!userRepository.existsById(userId)){
            return(new UserResponse(1, "Failed. UserId invalid."));
        }
        User foundUser = userRepository.findById(userId).get();
        return(new UserResponse(0, "Success.", foundUser.getName(), foundUser.getEmail(), loadImage(foundUser.getAccountPhotoId())));
    }
    @PostMapping("/authKeyUser")
    public @ResponseBody UserResponse getByAuthKey(@RequestParam Integer authKey){
        if(!authKeyRepository.existsById(authKey)){
            return(new UserResponse(1, "Failed. Auth key invalid."));
        }
        User authKeyUser = userRepository.findById(authKeyRepository.findById(authKey).get().getUserId()).get();
        return(new UserResponse(0, "Success.", authKeyUser.getName(), authKeyUser.getEmail(), loadImage(authKeyUser.getAccountPhotoId())));
    }

    private BufferedImage loadImage(String imagePath){
        File imageFile = new File(imagePath+".jpg");
        BufferedImage image = null;
        try {
            image = ImageIO.read(imageFile);
        }
        catch(IOException e){
            System.out.println("Failed to load image.");
        }
        return image;
    }

}
