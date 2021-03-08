package com.townz.web.rest;

import com.townz.domain.CityLocations;
import com.townz.repository.CityLocationsRepository;
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
 * REST controller for managing {@link com.townz.domain.CityLocations}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CityLocationsResource {
    private final Logger log = LoggerFactory.getLogger(CityLocationsResource.class);

    private static final String ENTITY_NAME = "townzCityLocations";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CityLocationsRepository cityLocationsRepository;

    public CityLocationsResource(CityLocationsRepository cityLocationsRepository) {
        this.cityLocationsRepository = cityLocationsRepository;
    }

    /**
     * {@code POST  /city-locations} : Create a new cityLocations.
     *
     * @param cityLocations the cityLocations to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cityLocations, or with status {@code 400 (Bad Request)} if the cityLocations has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/city-locations")
    public ResponseEntity<CityLocations> createCityLocations(@RequestBody CityLocations cityLocations) throws URISyntaxException {
        log.debug("REST request to save CityLocations : {}", cityLocations);
        if (cityLocations.getId() != null) {
            throw new BadRequestAlertException("A new cityLocations cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CityLocations result = cityLocationsRepository.save(cityLocations);
        return ResponseEntity
            .created(new URI("/api/city-locations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /city-locations} : Updates an existing cityLocations.
     *
     * @param cityLocations the cityLocations to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cityLocations,
     * or with status {@code 400 (Bad Request)} if the cityLocations is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cityLocations couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/city-locations")
    public ResponseEntity<CityLocations> updateCityLocations(@RequestBody CityLocations cityLocations) throws URISyntaxException {
        log.debug("REST request to update CityLocations : {}", cityLocations);
        if (cityLocations.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CityLocations result = cityLocationsRepository.save(cityLocations);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cityLocations.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /city-locations} : get all the cityLocations.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cityLocations in body.
     */
    @GetMapping("/city-locations")
    public List<CityLocations> getAllCityLocations() {
        log.debug("REST request to get all CityLocations");
        return cityLocationsRepository.findAll();
    }

    /**
     * {@code GET  /city-locations/:id} : get the "id" cityLocations.
     *
     * @param id the id of the cityLocations to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cityLocations, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/city-locations/{id}")
    public ResponseEntity<CityLocations> getCityLocations(@PathVariable Long id) {
        log.debug("REST request to get CityLocations : {}", id);
        Optional<CityLocations> cityLocations = cityLocationsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cityLocations);
    }

    /**
     * {@code DELETE  /city-locations/:id} : delete the "id" cityLocations.
     *
     * @param id the id of the cityLocations to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/city-locations/{id}")
    public ResponseEntity<Void> deleteCityLocations(@PathVariable Long id) {
        log.debug("REST request to delete CityLocations : {}", id);
        cityLocationsRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
