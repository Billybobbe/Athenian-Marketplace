package com.athenianMarketplace.dev.AuthKeys;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AuthKeyRepository extends CrudRepository<AuthKey, Integer>{
    public List<AuthKey> findAllByUserId(Integer userId);
}
