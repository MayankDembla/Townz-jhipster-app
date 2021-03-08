package com.townz.web.rest;

import com.townz.domain.CusotmerAppBanner;
import com.townz.repository.CusotmerAppBannerRepository;
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
 * REST controller for managing {@link com.townz.domain.CusotmerAppBanner}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CusotmerAppBannerResource {
    private final Logger log = LoggerFactory.getLogger(CusotmerAppBannerResource.class);

    private static final String ENTITY_NAME = "townzCusotmerAppBanner";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CusotmerAppBannerRepository cusotmerAppBannerRepository;

    public CusotmerAppBannerResource(CusotmerAppBannerRepository cusotmerAppBannerRepository) {
        this.cusotmerAppBannerRepository = cusotmerAppBannerRepository;
    }

    /**
     * {@code POST  /cusotmer-app-banners} : Create a new cusotmerAppBanner.
     *
     * @param cusotmerAppBanner the cusotmerAppBanner to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cusotmerAppBanner, or with status {@code 400 (Bad Request)} if the cusotmerAppBanner has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cusotmer-app-banners")
    public ResponseEntity<CusotmerAppBanner> createCusotmerAppBanner(@RequestBody CusotmerAppBanner cusotmerAppBanner)
        throws URISyntaxException {
        log.debug("REST request to save CusotmerAppBanner : {}", cusotmerAppBanner);
        if (cusotmerAppBanner.getId() != null) {
            throw new BadRequestAlertException("A new cusotmerAppBanner cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CusotmerAppBanner result = cusotmerAppBannerRepository.save(cusotmerAppBanner);
        return ResponseEntity
            .created(new URI("/api/cusotmer-app-banners/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cusotmer-app-banners} : Updates an existing cusotmerAppBanner.
     *
     * @param cusotmerAppBanner the cusotmerAppBanner to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cusotmerAppBanner,
     * or with status {@code 400 (Bad Request)} if the cusotmerAppBanner is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cusotmerAppBanner couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cusotmer-app-banners")
    public ResponseEntity<CusotmerAppBanner> updateCusotmerAppBanner(@RequestBody CusotmerAppBanner cusotmerAppBanner)
        throws URISyntaxException {
        log.debug("REST request to update CusotmerAppBanner : {}", cusotmerAppBanner);
        if (cusotmerAppBanner.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CusotmerAppBanner result = cusotmerAppBannerRepository.save(cusotmerAppBanner);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cusotmerAppBanner.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /cusotmer-app-banners} : get all the cusotmerAppBanners.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cusotmerAppBanners in body.
     */
    @GetMapping("/cusotmer-app-banners")
    public List<CusotmerAppBanner> getAllCusotmerAppBanners() {
        log.debug("REST request to get all CusotmerAppBanners");
        return cusotmerAppBannerRepository.findAll();
    }

    /**
     * {@code GET  /cusotmer-app-banners/:id} : get the "id" cusotmerAppBanner.
     *
     * @param id the id of the cusotmerAppBanner to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cusotmerAppBanner, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cusotmer-app-banners/{id}")
    public ResponseEntity<CusotmerAppBanner> getCusotmerAppBanner(@PathVariable Long id) {
        log.debug("REST request to get CusotmerAppBanner : {}", id);
        Optional<CusotmerAppBanner> cusotmerAppBanner = cusotmerAppBannerRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cusotmerAppBanner);
    }

    /**
     * {@code DELETE  /cusotmer-app-banners/:id} : delete the "id" cusotmerAppBanner.
     *
     * @param id the id of the cusotmerAppBanner to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cusotmer-app-banners/{id}")
    public ResponseEntity<Void> deleteCusotmerAppBanner(@PathVariable Long id) {
        log.debug("REST request to delete CusotmerAppBanner : {}", id);
        cusotmerAppBannerRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
