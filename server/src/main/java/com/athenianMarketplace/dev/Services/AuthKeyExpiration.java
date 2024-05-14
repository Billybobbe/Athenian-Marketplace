package com.athenianMarketplace.dev.Services;

import com.athenianMarketplace.dev.AuthKeys.AuthKey;
import com.athenianMarketplace.dev.AuthKeys.AuthKeyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;

@Service
public class AuthKeyExpiration {
    @Autowired
    AuthKeyRepository authKeyRepository;

    @Scheduled(fixedRate = 15*60*1000)
    public void deleteExpiredKeys(){
        Iterable<AuthKey> keys = authKeyRepository.findAll();
        for (AuthKey key : keys) {
            if(Duration.between(key.getExpiration(), LocalDateTime.now()).toDays()>30){
                authKeyRepository.delete(key);
            }
        }
    }
}
