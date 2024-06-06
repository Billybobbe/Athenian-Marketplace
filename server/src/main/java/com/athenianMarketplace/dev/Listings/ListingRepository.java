package com.athenianMarketplace.dev.Listings;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ListingRepository extends CrudRepository<Listing, Integer>{
    List<Listing> findByUserId(Integer userId);

    @Query("select l.listingId from Listing l where l.price >= ?1 and l.price <= ?2 and l.title LIKE %?3% and l.itemCondition = ?4")
    List<Integer> findByPriceAndFilter(Integer minPrice, Integer maxPrice, String filter, Integer itemCondition);
}
