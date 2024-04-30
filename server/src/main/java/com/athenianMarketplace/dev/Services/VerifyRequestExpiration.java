package com.athenianMarketplace.dev.Services;

import com.athenianMarketplace.dev.VerifyRequests.VerifyRequest;
import com.athenianMarketplace.dev.VerifyRequests.VerifyRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;

@Service
public class VerifyRequestExpiration {
    @Autowired
    VerifyRequestRepository verifyRequestRepository;

    @Scheduled(fixedRate = 15*60*1000)
    public void deleteExpiredVerifyRequests(){
        Iterable<VerifyRequest> verifyRequests = verifyRequestRepository.findAll();
        for(VerifyRequest v : verifyRequests){
            if(Duration.between(LocalDateTime.now(), v.getExpiration()).toMinutes()>15){
                verifyRequestRepository.delete(v);
            }
        }
    }
}
