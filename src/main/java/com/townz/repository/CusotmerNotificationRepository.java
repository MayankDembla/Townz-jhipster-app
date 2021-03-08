package com.townz.repository;

import com.townz.domain.CusotmerNotification;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the CusotmerNotification entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CusotmerNotificationRepository extends JpaRepository<CusotmerNotification, Long> {}
