package com.athenianMarketplace.dev.Responses;

import com.athenianMarketplace.dev.Listings.Listing;

import java.util.List;

public class ListingAuthKeyResponse extends ListingQueryResponse{
    public ListingAuthKeyResponse(Integer error, String message, List<Integer> listings) {
        super(error, message, listings);
    }
}
