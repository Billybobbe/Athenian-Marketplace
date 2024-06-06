package com.athenianMarketplace.dev.Requests;

import java.util.List;

public class ListingCreationRequest{
    public int authKey;
    public String title;
    public int price;
    public String description;
    public int itemCondition;
    public String location;
    public List<String> photos;
}
