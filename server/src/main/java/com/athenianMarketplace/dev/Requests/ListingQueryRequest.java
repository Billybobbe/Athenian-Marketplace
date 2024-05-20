package com.athenianMarketplace.dev.Requests;

import java.util.List;

public class ListingQueryRequest {
    public Integer authkey;
    public Integer minPrice;
    public Integer maxPrice;
    public List<String> keywords;
    public List<Integer> condition;
}
