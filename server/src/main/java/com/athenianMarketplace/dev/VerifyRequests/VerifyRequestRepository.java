package com.athenianMarketplace.dev.VerifyRequests;

import org.springframework.data.repository.CrudRepository;

public interface VerifyRequestRepository extends CrudRepository<VerifyRequest, Integer>{
    VerifyRequest findByemail(String email);
}
