package com.athenianMarketplace.dev.Listings;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ListingRepository extends CrudRepository<Listing, Integer>{
    List<Listing> findByUserId(Integer userId);
}
