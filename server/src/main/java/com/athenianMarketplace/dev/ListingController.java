package com.athenianMarketplace.dev;

import com.athenianMarketplace.dev.AuthKeys.AuthKeyRepository;
import com.athenianMarketplace.dev.Listings.Listing;
import com.athenianMarketplace.dev.Listings.ListingRepository;
import com.athenianMarketplace.dev.Requests.*;
import com.athenianMarketplace.dev.Responses.*;
import com.athenianMarketplace.dev.Users.User;
import com.athenianMarketplace.dev.Users.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.aspectj.util.FileUtil;
import org.aspectj.weaver.TypeFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.json.Jackson2JsonDecoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.lang.reflect.Array;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.*;

@Controller
@RequestMapping("/listing")
public class ListingController {
    @Autowired
    private ListingRepository listingRepository;
    @Autowired
    private AuthKeyRepository authKeyRepository;

    @PostMapping("/getCategories")
    public @ResponseBody CategoryResponse getListingCategories(@RequestBody CategoryRequest request){
        if(request.authKey==null || !authKeyRepository.existsById(request.authKey)){
            return(new CategoryResponse(1, "Auth key invalid", null));
        }
        ObjectMapper mapper = new ObjectMapper();
        String jsonText = null;
        try {
            jsonText = Files.readString(new File("./res/itemMappings.json").toPath());
        } catch (IOException e) {
            System.out.println("File read failed. Error: " + e);
            return(new CategoryResponse(1, "Internal error.", null));
        }
        Map<String, Map<String, String>> categories = null;
        try {
            categories = mapper.readValue(jsonText, new TypeReference<Map<String, Map<String, String>>>(){});
        } catch (JsonProcessingException e) {
            System.out.println("Json parse failed. Error: " + e);
            return(new CategoryResponse(1, "Internal error.", null));
        }
        return(new CategoryResponse(0, "Success.", new ArrayList<>(categories.keySet())));
    }

    @PostMapping("/getCategoryAttributes")
    public @ResponseBody CategorySubsectionResponse getCategoryAttributes(@RequestBody CategorySubsectionRequest request){
        if(request.authKey==null || !authKeyRepository.existsById(request.authKey)){
            return(new CategorySubsectionResponse(1, "Auth key invalid", null));
        }
        ObjectMapper mapper = new ObjectMapper();
        String jsonText = null;
        try {
            jsonText = Files.readString(new File("./res/itemMappings.json").toPath());
        } catch (IOException e) {
            System.out.println("File read failed. Error: " + e);
            return(new CategorySubsectionResponse(1, "Internal error.", null));
        }
        Map<String, Map<String, String>> categories = null;
        try {
            categories = mapper.readValue(jsonText, new TypeReference<Map<String, Map<String, String>>>(){});
        } catch (JsonProcessingException e) {
            System.out.println("Json parse failed. Error: " + e);
            return(new CategorySubsectionResponse(1, "Internal error.", null));
        }
        Map<String, String> subsection = categories.get(request.categoryName);
        if(subsection==null){
            return(new CategorySubsectionResponse(1, "Category does not exist.", null));
        }
        return(new CategorySubsectionResponse(0, "Success.", subsection));
    }

    @PostMapping("/getAllWithAttrib")
    public @ResponseBody ListingQueryResponse getAllWithAttrib(@RequestBody ListingQueryRequest request){
        if(request.authkey==null || !authKeyRepository.existsById(request.authkey)){
            return(new ListingQueryResponse(1, "Auth key invalid", null));
        }
        List<Integer> allListingIds = new ArrayList<>();
        if(request.keywords.size()>20){
            return(new ListingQueryResponse(2, "Too many search terms", null));
        }
        if(request.keywords.size()==0){ //if nothing specified we search all listings
            request.keywords.add("*");
        }
        if(request.condition.size()==0){ //if no condition specified search all
            request.condition.add(0);
            request.condition.add(1);
            request.condition.add(2);
            request.condition.add(3);
        }
        for(String keyword : request.keywords) {
            for (Integer c : request.condition) {
                allListingIds.addAll(listingRepository.findByPriceAndFilter(request.minPrice, request.maxPrice, keyword, c));
            }
        }
        for(int i = 0; i<allListingIds.size()-1; i++){ //delete duplicate listings
            for(int r = i+1; r<allListingIds.size(); r++){
                if(allListingIds.get(r).equals(allListingIds.get(i))){
                    allListingIds.remove(r);
                    r--;
                }
            }
        }
        return(new ListingQueryResponse(0, "Success", allListingIds));
    }
    @PostMapping("/getAllFromAuthKey")
    public @ResponseBody ListingAuthKeyResponse getAllFromAuthKey(@RequestBody AuthKeyRequest request){
        if(!authKeyRepository.existsById(request.authKey)){
            return(new ListingAuthKeyResponse(1, "Auth key invalid.", null));
        }
        List<Listing> listingList = listingRepository.findByUserId(authKeyRepository.findById(request.authKey).get().getUserId());
        List<Integer> listingIds = new ArrayList<>();
        for(Listing l : listingList){
            listingIds.add(l.getListingId());
        }

        return(new ListingAuthKeyResponse(0, "Success", listingIds));
    }

    //not using this right now as images served directly through apache. CORRECTION: Using this right now.
    @GetMapping("/getPhoto")
    public ResponseEntity<Resource> getListingPhoto(@RequestParam String imageID/*@RequestBody Map<String, String> params*/) {
        Path p = Paths.get("./res/listingImages/" + imageID + ".jpg");
        if(imageID.equals("undefined")){
            p = Paths.get("./res/utilImages/noImage.jpg");
        }
        Resource r;
        try {
            r = new UrlResource(p.toUri());
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(r);
    }
    @PostMapping("/{id}")
    public @ResponseBody ListingResponse getListing(@PathVariable("id") Integer listingId, @RequestBody UniqueListingRequest request){
        if(request.authKey!=null && authKeyRepository.existsById(request.authKey)){
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
    public @ResponseBody ServerResponse createListing(@RequestBody ListingCreationRequest request){
        if(!authKeyRepository.existsById(request.authKey)){
            return(new ServerResponse(1, "Failed. Auth key invalid."));
        }
        Integer userId = authKeyRepository.findById(request.authKey).get().getUserId();
        List<Listing> userListings = listingRepository.findByUserId(userId);
        if(userListings.size()>30){
            return(new ServerResponse(1, "Failed. Cannot have more than 30 listings active at a time."));
        }
        Listing newListing = new Listing();
        newListing.setTitle(request.title);
        newListing.setPrice(request.price);
        newListing.setDescription(request.description);
        newListing.setLocation(request.location);
        newListing.setCondition(request.itemCondition);
        newListing.setCreationDate(LocalDateTime.now());
        newListing.setUserId(userId);
        newListing = listingRepository.save(newListing);
        final Listing newListingFinalized = newListing;
        Thread saveImages = new Thread(() -> {
            List<String> imagePaths = saveListingImages(request.photos); //do after as this is a slow operation
            newListingFinalized.setImageIds(imagePaths);
            listingRepository.save(newListingFinalized);
        });
        saveImages.start();

        return(new ServerResponse(0, "Success."));
    }
    private List<String> saveListingImages(List<String> images){
        if(images == null){
            return null;
        }

        List<String> savedImagePaths = new ArrayList<>();
        for(String image : images){
            byte[] imageData = Base64.getDecoder().decode(image.substring(image.indexOf("base64,") + "base64,".length()));

            String imageName = UUID.randomUUID().toString();
            File imageFile = new File("./res/listingImages/" + imageName + ".jpg");
            BufferedImage finalImage = new BufferedImage(64, 64, BufferedImage.TYPE_INT_RGB);
            try {
                finalImage = ImageIO.read(new ByteArrayInputStream(imageData));
            }
            catch(IOException e){
                System.out.println("Failed to save image :(");
            }
            try{
                ImageIO.write(finalImage, "jpg", imageFile);
            } catch(IOException e){
                System.out.println("Failed to save image :(");
            }
            savedImagePaths.add(imageName);
        }
        return savedImagePaths;
    }
}
