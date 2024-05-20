package com.athenianMarketplace.dev.Responses;

import java.util.Base64;
import java.util.List;

public class ListingPhotoResponse {
    Integer error;
    String message;
    String imageData;
    public ListingPhotoResponse(Integer error, String message, String imageData){
        this.error = error;
        this.message = message;
        this.imageData = imageData;
    }
}
