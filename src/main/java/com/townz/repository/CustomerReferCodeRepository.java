package com.townz.repository;

import com.townz.domain.CustomerReferCode;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the CustomerReferCode entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomerReferCodeRepository extends JpaRepository<CustomerReferCode, Long> {}
