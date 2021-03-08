package com.townz.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.townz.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

public class CusotmerAppBannerTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CusotmerAppBanner.class);
        CusotmerAppBanner cusotmerAppBanner1 = new CusotmerAppBanner();
        cusotmerAppBanner1.setId(1L);
        CusotmerAppBanner cusotmerAppBanner2 = new CusotmerAppBanner();
        cusotmerAppBanner2.setId(cusotmerAppBanner1.getId());
        assertThat(cusotmerAppBanner1).isEqualTo(cusotmerAppBanner2);
        cusotmerAppBanner2.setId(2L);
        assertThat(cusotmerAppBanner1).isNotEqualTo(cusotmerAppBanner2);
        cusotmerAppBanner1.setId(null);
        assertThat(cusotmerAppBanner1).isNotEqualTo(cusotmerAppBanner2);
    }
}
