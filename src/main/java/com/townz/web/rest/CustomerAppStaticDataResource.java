package com.townz.web.rest;

import com.townz.domain.CustomerAppStaticData;
import com.townz.repository.CustomerAppStaticDataRepository;
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
 * REST controller for managing {@link com.townz.domain.CustomerAppStaticData}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CustomerAppStaticDataResource {
    private final Logger log = LoggerFactory.getLogger(CustomerAppStaticDataResource.class);

    private static final String ENTITY_NAME = "townzCustomerAppStaticData";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CustomerAppStaticDataRepository customerAppStaticDataRepository;

    public CustomerAppStaticDataResource(CustomerAppStaticDataRepository customerAppStaticDataRepository) {
        this.customerAppStaticDataRepository = customerAppStaticDataRepository;
    }

    /**
     * {@code POST  /customer-app-static-data} : Create a new customerAppStaticData.
     *
     * @param customerAppStaticData the customerAppStaticData to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new customerAppStaticData, or with status {@code 400 (Bad Request)} if the customerAppStaticData has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/customer-app-static-data")
    public ResponseEntity<CustomerAppStaticData> createCustomerAppStaticData(@RequestBody CustomerAppStaticData customerAppStaticData)
        throws URISyntaxException {
        log.debug("REST request to save CustomerAppStaticData : {}", customerAppStaticData);
        if (customerAppStaticData.getId() != null) {
            throw new BadRequestAlertException("A new customerAppStaticData cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CustomerAppStaticData result = customerAppStaticDataRepository.save(customerAppStaticData);
        return ResponseEntity
            .created(new URI("/api/customer-app-static-data/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /customer-app-static-data} : Updates an existing customerAppStaticData.
     *
     * @param customerAppStaticData the customerAppStaticData to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated customerAppStaticData,
     * or with status {@code 400 (Bad Request)} if the customerAppStaticData is not valid,
     * or with status {@code 500 (Internal Server Error)} if the customerAppStaticData couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/customer-app-static-data")
    public ResponseEntity<CustomerAppStaticData> updateCustomerAppStaticData(@RequestBody CustomerAppStaticData customerAppStaticData)
        throws URISyntaxException {
        log.debug("REST request to update CustomerAppStaticData : {}", customerAppStaticData);
        if (customerAppStaticData.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CustomerAppStaticData result = customerAppStaticDataRepository.save(customerAppStaticData);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, customerAppStaticData.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /customer-app-static-data} : get all the customerAppStaticData.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of customerAppStaticData in body.
     */
    @GetMapping("/customer-app-static-data")
    public List<CustomerAppStaticData> getAllCustomerAppStaticData() {
        log.debug("REST request to get all CustomerAppStaticData");
        return customerAppStaticDataRepository.findAll();
    }

    /**
     * {@code GET  /customer-app-static-data/:id} : get the "id" customerAppStaticData.
     *
     * @param id the id of the customerAppStaticData to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the customerAppStaticData, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/customer-app-static-data/{id}")
    public ResponseEntity<CustomerAppStaticData> getCustomerAppStaticData(@PathVariable Long id) {
        log.debug("REST request to get CustomerAppStaticData : {}", id);
        Optional<CustomerAppStaticData> customerAppStaticData = customerAppStaticDataRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(customerAppStaticData);
    }

    /**
     * {@code DELETE  /customer-app-static-data/:id} : delete the "id" customerAppStaticData.
     *
     * @param id the id of the customerAppStaticData to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/customer-app-static-data/{id}")
    public ResponseEntity<Void> deleteCustomerAppStaticData(@PathVariable Long id) {
        log.debug("REST request to delete CustomerAppStaticData : {}", id);
        customerAppStaticDataRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
