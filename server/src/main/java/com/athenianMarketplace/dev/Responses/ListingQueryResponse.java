package com.athenianMarketplace.dev.Responses;

import java.util.List;

public class ListingQueryResponse {
    public int error;
    public String message;
    public List<Integer> listings;

    public ListingQueryResponse(Integer error, String message, List<Integer> listings){
        this.error = error;
        this.message = message;
        this.listings = listings;
    }
}
