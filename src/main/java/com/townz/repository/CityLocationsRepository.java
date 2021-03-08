package com.townz.repository;

import com.townz.domain.CityLocations;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the CityLocations entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CityLocationsRepository extends JpaRepository<CityLocations, Long> {}
