package com.athenianMarketplace.dev.Listings;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"title", "userId"})})
public class Listing {
    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    private Integer listingId;
    private String title;
    private String description;
    private Integer price;
    private Integer itemCondition;
    private String location;
    @Column(length = 1024) //bigger so no overflow with
    private List<String> imageIds;
    private Integer userId;
    private LocalDateTime creationDate;

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

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }
}
