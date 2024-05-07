package com.athenianMarketplace.dev.Responses;

import java.awt.image.BufferedImage;

public class UserResponse{
    public int error;
    public String message;
    public String userName;
    public String email;
    public BufferedImage photo;
    public UserResponse(int error, String message, String userName, String email, BufferedImage photo){
        this.error = error;
        this.message = message;
        this.userName = userName;
        this.email = email;
        this.photo = photo;
    }
    public UserResponse(int error, String message){
        this.error = error;
        this.message = message;
    }
}
