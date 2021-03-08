package com.townz.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.townz.MyApp;
import com.townz.domain.CityLocations;
import com.townz.repository.CityLocationsRepository;
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
 * Integration tests for the {@link CityLocationsResource} REST controller.
 */
@SpringBootTest(classes = MyApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CityLocationsResourceIT {
    private static final String DEFAULT_LOCATION = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION = "BBBBBBBBBB";

    @Autowired
    private CityLocationsRepository cityLocationsRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCityLocationsMockMvc;

    private CityLocations cityLocations;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CityLocations createEntity(EntityManager em) {
        CityLocations cityLocations = new CityLocations().location(DEFAULT_LOCATION);
        return cityLocations;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CityLocations createUpdatedEntity(EntityManager em) {
        CityLocations cityLocations = new CityLocations().location(UPDATED_LOCATION);
        return cityLocations;
    }

    @BeforeEach
    public void initTest() {
        cityLocations = createEntity(em);
    }

    @Test
    @Transactional
    public void createCityLocations() throws Exception {
        int databaseSizeBeforeCreate = cityLocationsRepository.findAll().size();
        // Create the CityLocations
        restCityLocationsMockMvc
            .perform(
                post("/api/city-locations")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cityLocations))
            )
            .andExpect(status().isCreated());

        // Validate the CityLocations in the database
        List<CityLocations> cityLocationsList = cityLocationsRepository.findAll();
        assertThat(cityLocationsList).hasSize(databaseSizeBeforeCreate + 1);
        CityLocations testCityLocations = cityLocationsList.get(cityLocationsList.size() - 1);
        assertThat(testCityLocations.getLocation()).isEqualTo(DEFAULT_LOCATION);
    }

    @Test
    @Transactional
    public void createCityLocationsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cityLocationsRepository.findAll().size();

        // Create the CityLocations with an existing ID
        cityLocations.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCityLocationsMockMvc
            .perform(
                post("/api/city-locations")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cityLocations))
            )
            .andExpect(status().isBadRequest());

        // Validate the CityLocations in the database
        List<CityLocations> cityLocationsList = cityLocationsRepository.findAll();
        assertThat(cityLocationsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCityLocations() throws Exception {
        // Initialize the database
        cityLocationsRepository.saveAndFlush(cityLocations);

        // Get all the cityLocationsList
        restCityLocationsMockMvc
            .perform(get("/api/city-locations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cityLocations.getId().intValue())))
            .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION)));
    }

    @Test
    @Transactional
    public void getCityLocations() throws Exception {
        // Initialize the database
        cityLocationsRepository.saveAndFlush(cityLocations);

        // Get the cityLocations
        restCityLocationsMockMvc
            .perform(get("/api/city-locations/{id}", cityLocations.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cityLocations.getId().intValue()))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION));
    }

    @Test
    @Transactional
    public void getNonExistingCityLocations() throws Exception {
        // Get the cityLocations
        restCityLocationsMockMvc.perform(get("/api/city-locations/{id}", Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCityLocations() throws Exception {
        // Initialize the database
        cityLocationsRepository.saveAndFlush(cityLocations);

        int databaseSizeBeforeUpdate = cityLocationsRepository.findAll().size();

        // Update the cityLocations
        CityLocations updatedCityLocations = cityLocationsRepository.findById(cityLocations.getId()).get();
        // Disconnect from session so that the updates on updatedCityLocations are not directly saved in db
        em.detach(updatedCityLocations);
        updatedCityLocations.location(UPDATED_LOCATION);

        restCityLocationsMockMvc
            .perform(
                put("/api/city-locations")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCityLocations))
            )
            .andExpect(status().isOk());

        // Validate the CityLocations in the database
        List<CityLocations> cityLocationsList = cityLocationsRepository.findAll();
        assertThat(cityLocationsList).hasSize(databaseSizeBeforeUpdate);
        CityLocations testCityLocations = cityLocationsList.get(cityLocationsList.size() - 1);
        assertThat(testCityLocations.getLocation()).isEqualTo(UPDATED_LOCATION);
    }

    @Test
    @Transactional
    public void updateNonExistingCityLocations() throws Exception {
        int databaseSizeBeforeUpdate = cityLocationsRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCityLocationsMockMvc
            .perform(
                put("/api/city-locations").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cityLocations))
            )
            .andExpect(status().isBadRequest());

        // Validate the CityLocations in the database
        List<CityLocations> cityLocationsList = cityLocationsRepository.findAll();
        assertThat(cityLocationsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCityLocations() throws Exception {
        // Initialize the database
        cityLocationsRepository.saveAndFlush(cityLocations);

        int databaseSizeBeforeDelete = cityLocationsRepository.findAll().size();

        // Delete the cityLocations
        restCityLocationsMockMvc
            .perform(delete("/api/city-locations/{id}", cityLocations.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CityLocations> cityLocationsList = cityLocationsRepository.findAll();
        assertThat(cityLocationsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
