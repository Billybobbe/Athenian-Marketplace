package com.athenianMarketplace.dev.Responses;

import java.util.List;

public class CategoryResponse {
    public Integer error;
    public String message;
    public List<String> categories;
    public CategoryResponse(Integer error, String message, List<String> categories){
        this.error = error;
        this.message = message;
        this.categories = categories;
    }
}
