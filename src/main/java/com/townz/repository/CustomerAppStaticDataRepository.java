package com.townz.repository;

import com.townz.domain.CustomerAppStaticData;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the CustomerAppStaticData entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomerAppStaticDataRepository extends JpaRepository<CustomerAppStaticData, Long> {}
