package com.townz.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CusotmerNotification.
 */
@Entity
@Table(name = "cusotmer_notification")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CusotmerNotification implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "alert")
    private String alert;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @ManyToOne
    @JsonIgnoreProperties(value = "notifications", allowSetters = true)
    private Customer cusomer;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAlert() {
        return alert;
    }

    public CusotmerNotification alert(String alert) {
        this.alert = alert;
        return this;
    }

    public void setAlert(String alert) {
        this.alert = alert;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public CusotmerNotification createdAt(Instant createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public CusotmerNotification updatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Customer getCusomer() {
        return cusomer;
    }

    public CusotmerNotification cusomer(Customer customer) {
        this.cusomer = customer;
        return this;
    }

    public void setCusomer(Customer customer) {
        this.cusomer = customer;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CusotmerNotification)) {
            return false;
        }
        return id != null && id.equals(((CusotmerNotification) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CusotmerNotification{" +
            "id=" + getId() +
            ", alert='" + getAlert() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            "}";
    }
}
