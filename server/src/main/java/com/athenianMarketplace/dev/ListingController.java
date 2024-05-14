package com.athenianMarketplace.dev;

import com.athenianMarketplace.dev.AuthKeys.AuthKeyRepository;
import com.athenianMarketplace.dev.Listings.Listing;
import com.athenianMarketplace.dev.Listings.ListingRepository;
import com.athenianMarketplace.dev.Responses.ListingQueryResponse;
import com.athenianMarketplace.dev.Responses.ListingResponse;
import com.athenianMarketplace.dev.Responses.ServerResponse;
import com.athenianMarketplace.dev.Users.User;
import com.athenianMarketplace.dev.Users.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("/listing")
public class ListingController {
    @Autowired
    private ListingRepository listingRepository;
    @Autowired
    private AuthKeyRepository authKeyRepository;

    @PostMapping("/getAllWithAttrib")
    public @ResponseBody ListingQueryResponse getAllWithAttrib(@RequestParam Integer authKey, @RequestParam Integer minPrice, @RequestParam Integer maxPrice,
                                                               @RequestParam List<String> keywords, @RequestParam List<Integer> condition){
        if(!authKeyRepository.existsById(authKey)){
            return(new ListingQueryResponse(1, "Auth key invalid", null));
        }
        List<Integer> allListingIds = new ArrayList<>();
        if(keywords.size()>20){
            return(new ListingQueryResponse(1, "Too many search terms", null));
        }
        if(keywords.size()==0){ //if nothing specified we search all listings
            keywords.add("*");
        }
        if(condition.size()==0){ //if no condition specified search all
            condition.add(0);
            condition.add(1);
            condition.add(2);
            condition.add(3);
        }
        for(String keyword : keywords){
            for(Integer c : condition){
                allListingIds.addAll(listingRepository.findByPriceAndFilter(minPrice, maxPrice, keyword, c));
            }
        }
        return(new ListingQueryResponse(0, "Success", allListingIds));
    }

    @PostMapping("/{id}")
    public @ResponseBody ListingResponse getListing(@RequestParam Integer authKey, @PathVariable Integer listingId){
        if(authKeyRepository.existsById(authKey)){
            if(listingRepository.existsById(listingId)){
                return(new ListingResponse(0, "", listingRepository.findById(listingId).get()));
            }
            else{
                return(new ListingResponse(1, "Listing id invalid", null));
            }
        }
        return(new ListingResponse(1, "Auth key invalid", null));
    }
    @PostMapping("/create/submit")
    public @ResponseBody ServerResponse createListing(@RequestParam Integer authKey, @RequestParam String title, @RequestParam Integer price,
                                                      @RequestParam String description, @RequestParam Integer itemCondition, @RequestParam String location,
                                                      @RequestParam List<BufferedImage> images){
        if(!authKeyRepository.existsById(authKey)){
            return(new ServerResponse(1, "Failed. Auth key invalid."));
        }
        Integer userId = authKeyRepository.findById(authKey).get().getUserId();
        List<Listing> userListings = listingRepository.findByUserId(userId);
        if(userListings.size()>30){
            return(new ServerResponse(1, "Failed. Cannot have more than 30 listings active at a time."));
        }
        List<String> imagePaths = saveListingImages(images);
        Listing newListing = new Listing();
        newListing.setTitle(title);
        newListing.setPrice(price);
        newListing.setDescription(description);
        newListing.setLocation(location);
        newListing.setCondition(itemCondition);
        newListing.setCreationDate(LocalDateTime.now());
        newListing.setImageIds(imagePaths);
        listingRepository.save(newListing);
        return(new ServerResponse(0, "Success."));
    }
    private List<String> saveListingImages(List<BufferedImage> images){
        List<String> savedImagePaths = new ArrayList<>();
        for(BufferedImage image : images){
            String imageName = UUID.randomUUID().toString();
            File imageFile = new File(imageName+".jpg");
            try{
                ImageIO.write(image, "jpg", imageFile);
            } catch(IOException e){
                System.out.println("Failed to save image :(");
            }
            savedImagePaths.add(imageName);
        }
        return savedImagePaths;
    }
}
