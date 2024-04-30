package com.athenianMarketplace.dev.Users;

import jakarta.persistence.*;

@Entity
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE)
    private Integer id;
    private String accountPhotoId;
    private String name;
    private String email;
    private String password;

    public Integer getId() {
        return id;
    }
    public void setId(Integer id){
        this.id = id;
    }

    public String getAccountPhotoId() {
        return accountPhotoId;
    }

    public void setAccountPhotoId(String accountPhotoId) {
        this.accountPhotoId = accountPhotoId;
    }

    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}