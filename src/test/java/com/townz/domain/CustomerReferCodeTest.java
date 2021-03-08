package com.townz.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.townz.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

public class CustomerReferCodeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CustomerReferCode.class);
        CustomerReferCode customerReferCode1 = new CustomerReferCode();
        customerReferCode1.setId(1L);
        CustomerReferCode customerReferCode2 = new CustomerReferCode();
        customerReferCode2.setId(customerReferCode1.getId());
        assertThat(customerReferCode1).isEqualTo(customerReferCode2);
        customerReferCode2.setId(2L);
        assertThat(customerReferCode1).isNotEqualTo(customerReferCode2);
        customerReferCode1.setId(null);
        assertThat(customerReferCode1).isNotEqualTo(customerReferCode2);
    }
}
