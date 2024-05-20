package com.athenianMarketplace.dev.Requests;

import java.awt.image.BufferedImage;

public class AccountCreationRequest {
    public String email;
    public String password;
    public String name;
    public String photo;
    public Integer verifyCode;

    public AccountCreationRequest(String email, String password, String name, String photo, Integer verifyCode){
        this.email = email;
        this.password = password;
        this.name = name;
        this.photo = photo;
        this.verifyCode = verifyCode;
    }
}
