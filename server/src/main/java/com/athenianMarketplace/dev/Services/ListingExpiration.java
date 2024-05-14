package com.athenianMarketplace.dev.Services;

import com.athenianMarketplace.dev.Listings.Listing;
import com.athenianMarketplace.dev.Listings.ListingRepository;
import com.athenianMarketplace.dev.Responses.ListingResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;

@Service
public class ListingExpiration {
    @Autowired
    ListingRepository listingRepository;

    @Scheduled(fixedRate = 60*60*1000)
    public void deleteExpiredListings(){
        Iterable<Listing> listings = listingRepository.findAll();
        for(Listing listing : listings){
            if(Duration.between(listing.getCreationDate(), LocalDateTime.now()).toDays() > 90){
                listingRepository.delete(listing);
            }
        }
    }
}
