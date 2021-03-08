package com.townz.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.townz.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

public class CityLocationsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CityLocations.class);
        CityLocations cityLocations1 = new CityLocations();
        cityLocations1.setId(1L);
        CityLocations cityLocations2 = new CityLocations();
        cityLocations2.setId(cityLocations1.getId());
        assertThat(cityLocations1).isEqualTo(cityLocations2);
        cityLocations2.setId(2L);
        assertThat(cityLocations1).isNotEqualTo(cityLocations2);
        cityLocations1.setId(null);
        assertThat(cityLocations1).isNotEqualTo(cityLocations2);
    }
}
