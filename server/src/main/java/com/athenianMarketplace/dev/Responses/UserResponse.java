package com.athenianMarketplace.dev.Responses;

import java.awt.image.BufferedImage;

public class UserResponse{
    public int error;
    public String message;
    public String userName;
    public String email;
    public String photoURL;
    public String joinDate;

    public UserResponse(int error, String message, String userName, String email, String photoURL, String joinDate){
        this.error = error;
        this.message = message;
        this.userName = userName;
        this.email = email;
        this.photoURL = photoURL;
        this.joinDate = joinDate;
    }
    public UserResponse(int error, String message){
        this.error = error;
        this.message = message;
    }
}
