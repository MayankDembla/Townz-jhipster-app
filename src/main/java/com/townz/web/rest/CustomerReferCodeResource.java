package com.townz.web.rest;

import com.townz.domain.CustomerReferCode;
import com.townz.repository.CustomerReferCodeRepository;
import com.townz.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for managing {@link com.townz.domain.CustomerReferCode}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CustomerReferCodeResource {
    private final Logger log = LoggerFactory.getLogger(CustomerReferCodeResource.class);

    private static final String ENTITY_NAME = "townzCustomerReferCode";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CustomerReferCodeRepository customerReferCodeRepository;

    public CustomerReferCodeResource(CustomerReferCodeRepository customerReferCodeRepository) {
        this.customerReferCodeRepository = customerReferCodeRepository;
    }

    /**
     * {@code POST  /customer-refer-codes} : Create a new customerReferCode.
     *
     * @param customerReferCode the customerReferCode to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new customerReferCode, or with status {@code 400 (Bad Request)} if the customerReferCode has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/customer-refer-codes")
    public ResponseEntity<CustomerReferCode> createCustomerReferCode(@RequestBody CustomerReferCode customerReferCode)
        throws URISyntaxException {
        log.debug("REST request to save CustomerReferCode : {}", customerReferCode);
        if (customerReferCode.getId() != null) {
            throw new BadRequestAlertException("A new customerReferCode cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CustomerReferCode result = customerReferCodeRepository.save(customerReferCode);
        return ResponseEntity
            .created(new URI("/api/customer-refer-codes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /customer-refer-codes} : Updates an existing customerReferCode.
     *
     * @param customerReferCode the customerReferCode to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated customerReferCode,
     * or with status {@code 400 (Bad Request)} if the customerReferCode is not valid,
     * or with status {@code 500 (Internal Server Error)} if the customerReferCode couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/customer-refer-codes")
    public ResponseEntity<CustomerReferCode> updateCustomerReferCode(@RequestBody CustomerReferCode customerReferCode)
        throws URISyntaxException {
        log.debug("REST request to update CustomerReferCode : {}", customerReferCode);
        if (customerReferCode.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CustomerReferCode result = customerReferCodeRepository.save(customerReferCode);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, customerReferCode.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /customer-refer-codes} : get all the customerReferCodes.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of customerReferCodes in body.
     */
    @GetMapping("/customer-refer-codes")
    public List<CustomerReferCode> getAllCustomerReferCodes(@RequestParam(required = false) String filter) {
        if ("customer-is-null".equals(filter)) {
            log.debug("REST request to get all CustomerReferCodes where customer is null");
            return StreamSupport
                .stream(customerReferCodeRepository.findAll().spliterator(), false)
                .filter(customerReferCode -> customerReferCode.getCustomer() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all CustomerReferCodes");
        return customerReferCodeRepository.findAll();
    }

    /**
     * {@code GET  /customer-refer-codes/:id} : get the "id" customerReferCode.
     *
     * @param id the id of the customerReferCode to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the customerReferCode, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/customer-refer-codes/{id}")
    public ResponseEntity<CustomerReferCode> getCustomerReferCode(@PathVariable Long id) {
        log.debug("REST request to get CustomerReferCode : {}", id);
        Optional<CustomerReferCode> customerReferCode = customerReferCodeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(customerReferCode);
    }

    /**
     * {@code DELETE  /customer-refer-codes/:id} : delete the "id" customerReferCode.
     *
     * @param id the id of the customerReferCode to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/customer-refer-codes/{id}")
    public ResponseEntity<Void> deleteCustomerReferCode(@PathVariable Long id) {
        log.debug("REST request to delete CustomerReferCode : {}", id);
        customerReferCodeRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
