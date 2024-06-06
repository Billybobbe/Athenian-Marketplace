package com.athenianMarketplace.dev.Responses;

import java.util.Map;

public class CategorySubsectionResponse{
    public Integer error;
    public String message;
    public Map<String, String> jsonValues;
    public CategorySubsectionResponse(Integer error, String message, Map<String, String> jsonValues){
        this.error = error;
        this.message = message;
        this.jsonValues = jsonValues;
    }
}
