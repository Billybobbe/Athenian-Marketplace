package com.athenianMarketplace.dev.Listings;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.List;

@Entity
public class Listing {
    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    private Integer listingId;
    private String title;
    private String description;
    private Integer price;
    private Integer itemCondition;
    private String location;
    private List<String> imageIds;
    private Integer userId;

    public Integer getListingId() {
        return listingId;
    }

    public void setListingId(Integer listingId) {
        this.listingId = listingId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getItemCondition() {
        return itemCondition;
    }

    public void setCondition(Integer itemCondition) {
        this.itemCondition = itemCondition;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public List<String> getImageIds() {
        return imageIds;
    }

    public void setImageIds(List<String> imageIds){
        this.imageIds = imageIds;
    }
}
