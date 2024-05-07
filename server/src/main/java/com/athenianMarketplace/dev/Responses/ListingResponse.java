package com.athenianMarketplace.dev.Responses;

import com.athenianMarketplace.dev.Listings.Listing;

public class ListingResponse {
    public int error;
    public String message;
    public Listing listing;
    public ListingResponse(int error, String message, Listing listing){
        this.error = error;
        this.message = message;
        this.listing = listing;
    }
}
