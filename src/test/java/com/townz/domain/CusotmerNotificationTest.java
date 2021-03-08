package com.townz.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.townz.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

public class CusotmerNotificationTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CusotmerNotification.class);
        CusotmerNotification cusotmerNotification1 = new CusotmerNotification();
        cusotmerNotification1.setId(1L);
        CusotmerNotification cusotmerNotification2 = new CusotmerNotification();
        cusotmerNotification2.setId(cusotmerNotification1.getId());
        assertThat(cusotmerNotification1).isEqualTo(cusotmerNotification2);
        cusotmerNotification2.setId(2L);
        assertThat(cusotmerNotification1).isNotEqualTo(cusotmerNotification2);
        cusotmerNotification1.setId(null);
        assertThat(cusotmerNotification1).isNotEqualTo(cusotmerNotification2);
    }
}
