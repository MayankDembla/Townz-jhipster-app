package com.townz.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.townz.MyApp;
import com.townz.domain.CusotmerAppBanner;
import com.townz.repository.CusotmerAppBannerRepository;
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
 * Integration tests for the {@link CusotmerAppBannerResource} REST controller.
 */
@SpringBootTest(classes = MyApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CusotmerAppBannerResourceIT {
    private static final String DEFAULT_IMAGE = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE = "BBBBBBBBBB";

    private static final String DEFAULT_LOCATION = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION = "BBBBBBBBBB";

    @Autowired
    private CusotmerAppBannerRepository cusotmerAppBannerRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCusotmerAppBannerMockMvc;

    private CusotmerAppBanner cusotmerAppBanner;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CusotmerAppBanner createEntity(EntityManager em) {
        CusotmerAppBanner cusotmerAppBanner = new CusotmerAppBanner().image(DEFAULT_IMAGE).location(DEFAULT_LOCATION);
        return cusotmerAppBanner;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CusotmerAppBanner createUpdatedEntity(EntityManager em) {
        CusotmerAppBanner cusotmerAppBanner = new CusotmerAppBanner().image(UPDATED_IMAGE).location(UPDATED_LOCATION);
        return cusotmerAppBanner;
    }

    @BeforeEach
    public void initTest() {
        cusotmerAppBanner = createEntity(em);
    }

    @Test
    @Transactional
    public void createCusotmerAppBanner() throws Exception {
        int databaseSizeBeforeCreate = cusotmerAppBannerRepository.findAll().size();
        // Create the CusotmerAppBanner
        restCusotmerAppBannerMockMvc
            .perform(
                post("/api/cusotmer-app-banners")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cusotmerAppBanner))
            )
            .andExpect(status().isCreated());

        // Validate the CusotmerAppBanner in the database
        List<CusotmerAppBanner> cusotmerAppBannerList = cusotmerAppBannerRepository.findAll();
        assertThat(cusotmerAppBannerList).hasSize(databaseSizeBeforeCreate + 1);
        CusotmerAppBanner testCusotmerAppBanner = cusotmerAppBannerList.get(cusotmerAppBannerList.size() - 1);
        assertThat(testCusotmerAppBanner.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testCusotmerAppBanner.getLocation()).isEqualTo(DEFAULT_LOCATION);
    }

    @Test
    @Transactional
    public void createCusotmerAppBannerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cusotmerAppBannerRepository.findAll().size();

        // Create the CusotmerAppBanner with an existing ID
        cusotmerAppBanner.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCusotmerAppBannerMockMvc
            .perform(
                post("/api/cusotmer-app-banners")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cusotmerAppBanner))
            )
            .andExpect(status().isBadRequest());

        // Validate the CusotmerAppBanner in the database
        List<CusotmerAppBanner> cusotmerAppBannerList = cusotmerAppBannerRepository.findAll();
        assertThat(cusotmerAppBannerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCusotmerAppBanners() throws Exception {
        // Initialize the database
        cusotmerAppBannerRepository.saveAndFlush(cusotmerAppBanner);

        // Get all the cusotmerAppBannerList
        restCusotmerAppBannerMockMvc
            .perform(get("/api/cusotmer-app-banners?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cusotmerAppBanner.getId().intValue())))
            .andExpect(jsonPath("$.[*].image").value(hasItem(DEFAULT_IMAGE)))
            .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION)));
    }

    @Test
    @Transactional
    public void getCusotmerAppBanner() throws Exception {
        // Initialize the database
        cusotmerAppBannerRepository.saveAndFlush(cusotmerAppBanner);

        // Get the cusotmerAppBanner
        restCusotmerAppBannerMockMvc
            .perform(get("/api/cusotmer-app-banners/{id}", cusotmerAppBanner.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cusotmerAppBanner.getId().intValue()))
            .andExpect(jsonPath("$.image").value(DEFAULT_IMAGE))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION));
    }

    @Test
    @Transactional
    public void getNonExistingCusotmerAppBanner() throws Exception {
        // Get the cusotmerAppBanner
        restCusotmerAppBannerMockMvc.perform(get("/api/cusotmer-app-banners/{id}", Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCusotmerAppBanner() throws Exception {
        // Initialize the database
        cusotmerAppBannerRepository.saveAndFlush(cusotmerAppBanner);

        int databaseSizeBeforeUpdate = cusotmerAppBannerRepository.findAll().size();

        // Update the cusotmerAppBanner
        CusotmerAppBanner updatedCusotmerAppBanner = cusotmerAppBannerRepository.findById(cusotmerAppBanner.getId()).get();
        // Disconnect from session so that the updates on updatedCusotmerAppBanner are not directly saved in db
        em.detach(updatedCusotmerAppBanner);
        updatedCusotmerAppBanner.image(UPDATED_IMAGE).location(UPDATED_LOCATION);

        restCusotmerAppBannerMockMvc
            .perform(
                put("/api/cusotmer-app-banners")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCusotmerAppBanner))
            )
            .andExpect(status().isOk());

        // Validate the CusotmerAppBanner in the database
        List<CusotmerAppBanner> cusotmerAppBannerList = cusotmerAppBannerRepository.findAll();
        assertThat(cusotmerAppBannerList).hasSize(databaseSizeBeforeUpdate);
        CusotmerAppBanner testCusotmerAppBanner = cusotmerAppBannerList.get(cusotmerAppBannerList.size() - 1);
        assertThat(testCusotmerAppBanner.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testCusotmerAppBanner.getLocation()).isEqualTo(UPDATED_LOCATION);
    }

    @Test
    @Transactional
    public void updateNonExistingCusotmerAppBanner() throws Exception {
        int databaseSizeBeforeUpdate = cusotmerAppBannerRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCusotmerAppBannerMockMvc
            .perform(
                put("/api/cusotmer-app-banners")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cusotmerAppBanner))
            )
            .andExpect(status().isBadRequest());

        // Validate the CusotmerAppBanner in the database
        List<CusotmerAppBanner> cusotmerAppBannerList = cusotmerAppBannerRepository.findAll();
        assertThat(cusotmerAppBannerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCusotmerAppBanner() throws Exception {
        // Initialize the database
        cusotmerAppBannerRepository.saveAndFlush(cusotmerAppBanner);

        int databaseSizeBeforeDelete = cusotmerAppBannerRepository.findAll().size();

        // Delete the cusotmerAppBanner
        restCusotmerAppBannerMockMvc
            .perform(delete("/api/cusotmer-app-banners/{id}", cusotmerAppBanner.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CusotmerAppBanner> cusotmerAppBannerList = cusotmerAppBannerRepository.findAll();
        assertThat(cusotmerAppBannerList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
