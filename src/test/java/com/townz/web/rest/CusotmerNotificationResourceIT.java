package com.townz.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.townz.MyApp;
import com.townz.domain.CusotmerNotification;
import com.townz.repository.CusotmerNotificationRepository;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
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
 * Integration tests for the {@link CusotmerNotificationResource} REST controller.
 */
@SpringBootTest(classes = MyApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CusotmerNotificationResourceIT {
    private static final String DEFAULT_ALERT = "AAAAAAAAAA";
    private static final String UPDATED_ALERT = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private CusotmerNotificationRepository cusotmerNotificationRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCusotmerNotificationMockMvc;

    private CusotmerNotification cusotmerNotification;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CusotmerNotification createEntity(EntityManager em) {
        CusotmerNotification cusotmerNotification = new CusotmerNotification()
            .alert(DEFAULT_ALERT)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedAt(DEFAULT_UPDATED_AT);
        return cusotmerNotification;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CusotmerNotification createUpdatedEntity(EntityManager em) {
        CusotmerNotification cusotmerNotification = new CusotmerNotification()
            .alert(UPDATED_ALERT)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);
        return cusotmerNotification;
    }

    @BeforeEach
    public void initTest() {
        cusotmerNotification = createEntity(em);
    }

    @Test
    @Transactional
    public void createCusotmerNotification() throws Exception {
        int databaseSizeBeforeCreate = cusotmerNotificationRepository.findAll().size();
        // Create the CusotmerNotification
        restCusotmerNotificationMockMvc
            .perform(
                post("/api/cusotmer-notifications")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cusotmerNotification))
            )
            .andExpect(status().isCreated());

        // Validate the CusotmerNotification in the database
        List<CusotmerNotification> cusotmerNotificationList = cusotmerNotificationRepository.findAll();
        assertThat(cusotmerNotificationList).hasSize(databaseSizeBeforeCreate + 1);
        CusotmerNotification testCusotmerNotification = cusotmerNotificationList.get(cusotmerNotificationList.size() - 1);
        assertThat(testCusotmerNotification.getAlert()).isEqualTo(DEFAULT_ALERT);
        assertThat(testCusotmerNotification.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testCusotmerNotification.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createCusotmerNotificationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cusotmerNotificationRepository.findAll().size();

        // Create the CusotmerNotification with an existing ID
        cusotmerNotification.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCusotmerNotificationMockMvc
            .perform(
                post("/api/cusotmer-notifications")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cusotmerNotification))
            )
            .andExpect(status().isBadRequest());

        // Validate the CusotmerNotification in the database
        List<CusotmerNotification> cusotmerNotificationList = cusotmerNotificationRepository.findAll();
        assertThat(cusotmerNotificationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCusotmerNotifications() throws Exception {
        // Initialize the database
        cusotmerNotificationRepository.saveAndFlush(cusotmerNotification);

        // Get all the cusotmerNotificationList
        restCusotmerNotificationMockMvc
            .perform(get("/api/cusotmer-notifications?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cusotmerNotification.getId().intValue())))
            .andExpect(jsonPath("$.[*].alert").value(hasItem(DEFAULT_ALERT)))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }

    @Test
    @Transactional
    public void getCusotmerNotification() throws Exception {
        // Initialize the database
        cusotmerNotificationRepository.saveAndFlush(cusotmerNotification);

        // Get the cusotmerNotification
        restCusotmerNotificationMockMvc
            .perform(get("/api/cusotmer-notifications/{id}", cusotmerNotification.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cusotmerNotification.getId().intValue()))
            .andExpect(jsonPath("$.alert").value(DEFAULT_ALERT))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCusotmerNotification() throws Exception {
        // Get the cusotmerNotification
        restCusotmerNotificationMockMvc.perform(get("/api/cusotmer-notifications/{id}", Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCusotmerNotification() throws Exception {
        // Initialize the database
        cusotmerNotificationRepository.saveAndFlush(cusotmerNotification);

        int databaseSizeBeforeUpdate = cusotmerNotificationRepository.findAll().size();

        // Update the cusotmerNotification
        CusotmerNotification updatedCusotmerNotification = cusotmerNotificationRepository.findById(cusotmerNotification.getId()).get();
        // Disconnect from session so that the updates on updatedCusotmerNotification are not directly saved in db
        em.detach(updatedCusotmerNotification);
        updatedCusotmerNotification.alert(UPDATED_ALERT).createdAt(UPDATED_CREATED_AT).updatedAt(UPDATED_UPDATED_AT);

        restCusotmerNotificationMockMvc
            .perform(
                put("/api/cusotmer-notifications")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCusotmerNotification))
            )
            .andExpect(status().isOk());

        // Validate the CusotmerNotification in the database
        List<CusotmerNotification> cusotmerNotificationList = cusotmerNotificationRepository.findAll();
        assertThat(cusotmerNotificationList).hasSize(databaseSizeBeforeUpdate);
        CusotmerNotification testCusotmerNotification = cusotmerNotificationList.get(cusotmerNotificationList.size() - 1);
        assertThat(testCusotmerNotification.getAlert()).isEqualTo(UPDATED_ALERT);
        assertThat(testCusotmerNotification.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testCusotmerNotification.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingCusotmerNotification() throws Exception {
        int databaseSizeBeforeUpdate = cusotmerNotificationRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCusotmerNotificationMockMvc
            .perform(
                put("/api/cusotmer-notifications")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cusotmerNotification))
            )
            .andExpect(status().isBadRequest());

        // Validate the CusotmerNotification in the database
        List<CusotmerNotification> cusotmerNotificationList = cusotmerNotificationRepository.findAll();
        assertThat(cusotmerNotificationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCusotmerNotification() throws Exception {
        // Initialize the database
        cusotmerNotificationRepository.saveAndFlush(cusotmerNotification);

        int databaseSizeBeforeDelete = cusotmerNotificationRepository.findAll().size();

        // Delete the cusotmerNotification
        restCusotmerNotificationMockMvc
            .perform(delete("/api/cusotmer-notifications/{id}", cusotmerNotification.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CusotmerNotification> cusotmerNotificationList = cusotmerNotificationRepository.findAll();
        assertThat(cusotmerNotificationList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
