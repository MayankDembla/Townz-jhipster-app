package com.townz.repository;

import com.townz.domain.CusotmerAppBanner;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the CusotmerAppBanner entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CusotmerAppBannerRepository extends JpaRepository<CusotmerAppBanner, Long> {}
