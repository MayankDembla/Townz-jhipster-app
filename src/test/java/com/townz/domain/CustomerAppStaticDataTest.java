package com.townz.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.townz.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

public class CustomerAppStaticDataTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CustomerAppStaticData.class);
        CustomerAppStaticData customerAppStaticData1 = new CustomerAppStaticData();
        customerAppStaticData1.setId(1L);
        CustomerAppStaticData customerAppStaticData2 = new CustomerAppStaticData();
        customerAppStaticData2.setId(customerAppStaticData1.getId());
        assertThat(customerAppStaticData1).isEqualTo(customerAppStaticData2);
        customerAppStaticData2.setId(2L);
        assertThat(customerAppStaticData1).isNotEqualTo(customerAppStaticData2);
        customerAppStaticData1.setId(null);
        assertThat(customerAppStaticData1).isNotEqualTo(customerAppStaticData2);
    }
}
