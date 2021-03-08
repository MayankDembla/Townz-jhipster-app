package com.townz.web.rest;

import com.townz.domain.CusotmerNotification;
import com.townz.repository.CusotmerNotificationRepository;
import com.townz.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for managing {@link com.townz.domain.CusotmerNotification}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CusotmerNotificationResource {
    private final Logger log = LoggerFactory.getLogger(CusotmerNotificationResource.class);

    private static final String ENTITY_NAME = "townzCusotmerNotification";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CusotmerNotificationRepository cusotmerNotificationRepository;

    public CusotmerNotificationResource(CusotmerNotificationRepository cusotmerNotificationRepository) {
        this.cusotmerNotificationRepository = cusotmerNotificationRepository;
    }

    /**
     * {@code POST  /cusotmer-notifications} : Create a new cusotmerNotification.
     *
     * @param cusotmerNotification the cusotmerNotification to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cusotmerNotification, or with status {@code 400 (Bad Request)} if the cusotmerNotification has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cusotmer-notifications")
    public ResponseEntity<CusotmerNotification> createCusotmerNotification(@RequestBody CusotmerNotification cusotmerNotification)
        throws URISyntaxException {
        log.debug("REST request to save CusotmerNotification : {}", cusotmerNotification);
        if (cusotmerNotification.getId() != null) {
            throw new BadRequestAlertException("A new cusotmerNotification cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CusotmerNotification result = cusotmerNotificationRepository.save(cusotmerNotification);
        return ResponseEntity
            .created(new URI("/api/cusotmer-notifications/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cusotmer-notifications} : Updates an existing cusotmerNotification.
     *
     * @param cusotmerNotification the cusotmerNotification to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cusotmerNotification,
     * or with status {@code 400 (Bad Request)} if the cusotmerNotification is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cusotmerNotification couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cusotmer-notifications")
    public ResponseEntity<CusotmerNotification> updateCusotmerNotification(@RequestBody CusotmerNotification cusotmerNotification)
        throws URISyntaxException {
        log.debug("REST request to update CusotmerNotification : {}", cusotmerNotification);
        if (cusotmerNotification.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CusotmerNotification result = cusotmerNotificationRepository.save(cusotmerNotification);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cusotmerNotification.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /cusotmer-notifications} : get all the cusotmerNotifications.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cusotmerNotifications in body.
     */
    @GetMapping("/cusotmer-notifications")
    public List<CusotmerNotification> getAllCusotmerNotifications() {
        log.debug("REST request to get all CusotmerNotifications");
        return cusotmerNotificationRepository.findAll();
    }

    /**
     * {@code GET  /cusotmer-notifications/:id} : get the "id" cusotmerNotification.
     *
     * @param id the id of the cusotmerNotification to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cusotmerNotification, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cusotmer-notifications/{id}")
    public ResponseEntity<CusotmerNotification> getCusotmerNotification(@PathVariable Long id) {
        log.debug("REST request to get CusotmerNotification : {}", id);
        Optional<CusotmerNotification> cusotmerNotification = cusotmerNotificationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cusotmerNotification);
    }

    /**
     * {@code DELETE  /cusotmer-notifications/:id} : delete the "id" cusotmerNotification.
     *
     * @param id the id of the cusotmerNotification to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cusotmer-notifications/{id}")
    public ResponseEntity<Void> deleteCusotmerNotification(@PathVariable Long id) {
        log.debug("REST request to delete CusotmerNotification : {}", id);
        cusotmerNotificationRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
