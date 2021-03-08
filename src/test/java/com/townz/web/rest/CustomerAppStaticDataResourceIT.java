package com.townz.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.townz.MyApp;
import com.townz.domain.CustomerAppStaticData;
import com.townz.repository.CustomerAppStaticDataRepository;
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
 * Integration tests for the {@link CustomerAppStaticDataResource} REST controller.
 */
@SpringBootTest(classes = MyApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CustomerAppStaticDataResourceIT {
    private static final String DEFAULT_HEADING = "AAAAAAAAAA";
    private static final String UPDATED_HEADING = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    @Autowired
    private CustomerAppStaticDataRepository customerAppStaticDataRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCustomerAppStaticDataMockMvc;

    private CustomerAppStaticData customerAppStaticData;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CustomerAppStaticData createEntity(EntityManager em) {
        CustomerAppStaticData customerAppStaticData = new CustomerAppStaticData().heading(DEFAULT_HEADING).content(DEFAULT_CONTENT);
        return customerAppStaticData;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CustomerAppStaticData createUpdatedEntity(EntityManager em) {
        CustomerAppStaticData customerAppStaticData = new CustomerAppStaticData().heading(UPDATED_HEADING).content(UPDATED_CONTENT);
        return customerAppStaticData;
    }

    @BeforeEach
    public void initTest() {
        customerAppStaticData = createEntity(em);
    }

    @Test
    @Transactional
    public void createCustomerAppStaticData() throws Exception {
        int databaseSizeBeforeCreate = customerAppStaticDataRepository.findAll().size();
        // Create the CustomerAppStaticData
        restCustomerAppStaticDataMockMvc
            .perform(
                post("/api/customer-app-static-data")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(customerAppStaticData))
            )
            .andExpect(status().isCreated());

        // Validate the CustomerAppStaticData in the database
        List<CustomerAppStaticData> customerAppStaticDataList = customerAppStaticDataRepository.findAll();
        assertThat(customerAppStaticDataList).hasSize(databaseSizeBeforeCreate + 1);
        CustomerAppStaticData testCustomerAppStaticData = customerAppStaticDataList.get(customerAppStaticDataList.size() - 1);
        assertThat(testCustomerAppStaticData.getHeading()).isEqualTo(DEFAULT_HEADING);
        assertThat(testCustomerAppStaticData.getContent()).isEqualTo(DEFAULT_CONTENT);
    }

    @Test
    @Transactional
    public void createCustomerAppStaticDataWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = customerAppStaticDataRepository.findAll().size();

        // Create the CustomerAppStaticData with an existing ID
        customerAppStaticData.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCustomerAppStaticDataMockMvc
            .perform(
                post("/api/customer-app-static-data")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(customerAppStaticData))
            )
            .andExpect(status().isBadRequest());

        // Validate the CustomerAppStaticData in the database
        List<CustomerAppStaticData> customerAppStaticDataList = customerAppStaticDataRepository.findAll();
        assertThat(customerAppStaticDataList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCustomerAppStaticData() throws Exception {
        // Initialize the database
        customerAppStaticDataRepository.saveAndFlush(customerAppStaticData);

        // Get all the customerAppStaticDataList
        restCustomerAppStaticDataMockMvc
            .perform(get("/api/customer-app-static-data?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(customerAppStaticData.getId().intValue())))
            .andExpect(jsonPath("$.[*].heading").value(hasItem(DEFAULT_HEADING)))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT)));
    }

    @Test
    @Transactional
    public void getCustomerAppStaticData() throws Exception {
        // Initialize the database
        customerAppStaticDataRepository.saveAndFlush(customerAppStaticData);

        // Get the customerAppStaticData
        restCustomerAppStaticDataMockMvc
            .perform(get("/api/customer-app-static-data/{id}", customerAppStaticData.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(customerAppStaticData.getId().intValue()))
            .andExpect(jsonPath("$.heading").value(DEFAULT_HEADING))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT));
    }

    @Test
    @Transactional
    public void getNonExistingCustomerAppStaticData() throws Exception {
        // Get the customerAppStaticData
        restCustomerAppStaticDataMockMvc
            .perform(get("/api/customer-app-static-data/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCustomerAppStaticData() throws Exception {
        // Initialize the database
        customerAppStaticDataRepository.saveAndFlush(customerAppStaticData);

        int databaseSizeBeforeUpdate = customerAppStaticDataRepository.findAll().size();

        // Update the customerAppStaticData
        CustomerAppStaticData updatedCustomerAppStaticData = customerAppStaticDataRepository.findById(customerAppStaticData.getId()).get();
        // Disconnect from session so that the updates on updatedCustomerAppStaticData are not directly saved in db
        em.detach(updatedCustomerAppStaticData);
        updatedCustomerAppStaticData.heading(UPDATED_HEADING).content(UPDATED_CONTENT);

        restCustomerAppStaticDataMockMvc
            .perform(
                put("/api/customer-app-static-data")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCustomerAppStaticData))
            )
            .andExpect(status().isOk());

        // Validate the CustomerAppStaticData in the database
        List<CustomerAppStaticData> customerAppStaticDataList = customerAppStaticDataRepository.findAll();
        assertThat(customerAppStaticDataList).hasSize(databaseSizeBeforeUpdate);
        CustomerAppStaticData testCustomerAppStaticData = customerAppStaticDataList.get(customerAppStaticDataList.size() - 1);
        assertThat(testCustomerAppStaticData.getHeading()).isEqualTo(UPDATED_HEADING);
        assertThat(testCustomerAppStaticData.getContent()).isEqualTo(UPDATED_CONTENT);
    }

    @Test
    @Transactional
    public void updateNonExistingCustomerAppStaticData() throws Exception {
        int databaseSizeBeforeUpdate = customerAppStaticDataRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCustomerAppStaticDataMockMvc
            .perform(
                put("/api/customer-app-static-data")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(customerAppStaticData))
            )
            .andExpect(status().isBadRequest());

        // Validate the CustomerAppStaticData in the database
        List<CustomerAppStaticData> customerAppStaticDataList = customerAppStaticDataRepository.findAll();
        assertThat(customerAppStaticDataList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCustomerAppStaticData() throws Exception {
        // Initialize the database
        customerAppStaticDataRepository.saveAndFlush(customerAppStaticData);

        int databaseSizeBeforeDelete = customerAppStaticDataRepository.findAll().size();

        // Delete the customerAppStaticData
        restCustomerAppStaticDataMockMvc
            .perform(delete("/api/customer-app-static-data/{id}", customerAppStaticData.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CustomerAppStaticData> customerAppStaticDataList = customerAppStaticDataRepository.findAll();
        assertThat(customerAppStaticDataList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
