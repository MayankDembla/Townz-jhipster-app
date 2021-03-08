package com.townz.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CustomerAppStaticData.
 */
@Entity
@Table(name = "customer_app_static_data")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CustomerAppStaticData implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "heading")
    private String heading;

    @Column(name = "content")
    private String content;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHeading() {
        return heading;
    }

    public CustomerAppStaticData heading(String heading) {
        this.heading = heading;
        return this;
    }

    public void setHeading(String heading) {
        this.heading = heading;
    }

    public String getContent() {
        return content;
    }

    public CustomerAppStaticData content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CustomerAppStaticData)) {
            return false;
        }
        return id != null && id.equals(((CustomerAppStaticData) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CustomerAppStaticData{" +
            "id=" + getId() +
            ", heading='" + getHeading() + "'" +
            ", content='" + getContent() + "'" +
            "}";
    }
}
