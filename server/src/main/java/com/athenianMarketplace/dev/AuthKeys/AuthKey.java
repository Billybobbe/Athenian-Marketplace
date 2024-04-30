package com.athenianMarketplace.dev.AuthKeys;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.*;

@Entity
public class AuthKey {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE)
    private Integer keyId;
    private Integer userId;
    private LocalDateTime expiration;

    public Integer getKeyId() {
        return keyId;
    }
    public void setKeyId(Integer keyId) {
        this.keyId = keyId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public LocalDateTime getExpiration() {
        return expiration;
    }

    public void setExpiration(LocalDateTime expiration) {
        this.expiration = expiration;
    }
}
