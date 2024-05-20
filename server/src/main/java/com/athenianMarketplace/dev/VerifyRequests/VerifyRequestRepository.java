package com.athenianMarketplace.dev.VerifyRequests;

import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.repository.CrudRepository;

public interface VerifyRequestRepository extends JpaRepository<VerifyRequest, Integer> {
    VerifyRequest findByemail(String email);
}
