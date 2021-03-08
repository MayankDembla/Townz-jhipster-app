package com.townz.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.townz.MyApp;
import com.townz.domain.CustomerReferCode;
import com.townz.repository.CustomerReferCodeRepository;
import java.util.List;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link CustomerReferCodeResource} REST controller.
 */
@SpringBootTest(classes = MyApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CustomerReferCodeResourceIT {
    @Autowired
    private CustomerReferCodeRepository customerReferCodeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCustomerReferCodeMockMvc;

    private CustomerReferCode customerReferCode;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CustomerReferCode createEntity(EntityManager em) {
        CustomerReferCode customerReferCode = new CustomerReferCode();
        return customerReferCode;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CustomerReferCode createUpdatedEntity(EntityManager em) {
        CustomerReferCode customerReferCode = new CustomerReferCode();
        return customerReferCode;
    }

    @BeforeEach
    public void initTest() {
        customerReferCode = createEntity(em);
    }

    @Test
    @Transactional
    public void createCustomerReferCode() throws Exception {
        int databaseSizeBeforeCreate = customerReferCodeRepository.findAll().size();
        // Create the CustomerReferCode
        restCustomerReferCodeMockMvc
            .perform(
                post("/api/customer-refer-codes")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(customerReferCode))
            )
            .andExpect(status().isCreated());

        // Validate the CustomerReferCode in the database
        List<CustomerReferCode> customerReferCodeList = customerReferCodeRepository.findAll();
        assertThat(customerReferCodeList).hasSize(databaseSizeBeforeCreate + 1);
        CustomerReferCode testCustomerReferCode = customerReferCodeList.get(customerReferCodeList.size() - 1);
    }

    @Test
    @Transactional
    public void createCustomerReferCodeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = customerReferCodeRepository.findAll().size();

        // Create the CustomerReferCode with an existing ID
        customerReferCode.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCustomerReferCodeMockMvc
            .perform(
                post("/api/customer-refer-codes")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(customerReferCode))
            )
            .andExpect(status().isBadRequest());

        // Validate the CustomerReferCode in the database
        List<CustomerReferCode> customerReferCodeList = customerReferCodeRepository.findAll();
        assertThat(customerReferCodeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCustomerReferCodes() throws Exception {
        // Initialize the database
        customerReferCodeRepository.saveAndFlush(customerReferCode);

        // Get all the customerReferCodeList
        restCustomerReferCodeMockMvc
            .perform(get("/api/customer-refer-codes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(customerReferCode.getId().intValue())));
    }

    @Test
    @Transactional
    public void getCustomerReferCode() throws Exception {
        // Initialize the database
        customerReferCodeRepository.saveAndFlush(customerReferCode);

        // Get the customerReferCode
        restCustomerReferCodeMockMvc
            .perform(get("/api/customer-refer-codes/{id}", customerReferCode.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(customerReferCode.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCustomerReferCode() throws Exception {
        // Get the customerReferCode
        restCustomerReferCodeMockMvc.perform(get("/api/customer-refer-codes/{id}", Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCustomerReferCode() throws Exception {
        // Initialize the database
        customerReferCodeRepository.saveAndFlush(customerReferCode);

        int databaseSizeBeforeUpdate = customerReferCodeRepository.findAll().size();

        // Update the customerReferCode
        CustomerReferCode updatedCustomerReferCode = customerReferCodeRepository.findById(customerReferCode.getId()).get();
        // Disconnect from session so that the updates on updatedCustomerReferCode are not directly saved in db
        em.detach(updatedCustomerReferCode);

        restCustomerReferCodeMockMvc
            .perform(
                put("/api/customer-refer-codes")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCustomerReferCode))
            )
            .andExpect(status().isOk());

        // Validate the CustomerReferCode in the database
        List<CustomerReferCode> customerReferCodeList = customerReferCodeRepository.findAll();
        assertThat(customerReferCodeList).hasSize(databaseSizeBeforeUpdate);
        CustomerReferCode testCustomerReferCode = customerReferCodeList.get(customerReferCodeList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingCustomerReferCode() throws Exception {
        int databaseSizeBeforeUpdate = customerReferCodeRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCustomerReferCodeMockMvc
            .perform(
                put("/api/customer-refer-codes")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(customerReferCode))
            )
            .andExpect(status().isBadRequest());

        // Validate the CustomerReferCode in the database
        List<CustomerReferCode> customerReferCodeList = customerReferCodeRepository.findAll();
        assertThat(customerReferCodeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCustomerReferCode() throws Exception {
        // Initialize the database
        customerReferCodeRepository.saveAndFlush(customerReferCode);

        int databaseSizeBeforeDelete = customerReferCodeRepository.findAll().size();

        // Delete the customerReferCode
        restCustomerReferCodeMockMvc
            .perform(delete("/api/customer-refer-codes/{id}", customerReferCode.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CustomerReferCode> customerReferCodeList = customerReferCodeRepository.findAll();
        assertThat(customerReferCodeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
