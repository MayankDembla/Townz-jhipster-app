package com.townz.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Wallet.
 */
@Entity
@Table(name = "wallet")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Wallet implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "wallet_id")
    private Long walletId;

    @Column(name = "balance")
    private Float balance;

    @Column(name = "credit")
    private Long credit;

    @OneToOne(mappedBy = "wallet")
    @JsonIgnore
    private Customer customer;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getWalletId() {
        return walletId;
    }

    public Wallet walletId(Long walletId) {
        this.walletId = walletId;
        return this;
    }

    public void setWalletId(Long walletId) {
        this.walletId = walletId;
    }

    public Float getBalance() {
        return balance;
    }

    public Wallet balance(Float balance) {
        this.balance = balance;
        return this;
    }

    public void setBalance(Float balance) {
        this.balance = balance;
    }

    public Long getCredit() {
        return credit;
    }

    public Wallet credit(Long credit) {
        this.credit = credit;
        return this;
    }

    public void setCredit(Long credit) {
        this.credit = credit;
    }

    public Customer getCustomer() {
        return customer;
    }

    public Wallet customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Wallet)) {
            return false;
        }
        return id != null && id.equals(((Wallet) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Wallet{" +
            "id=" + getId() +
            ", walletId=" + getWalletId() +
            ", balance=" + getBalance() +
            ", credit=" + getCredit() +
            "}";
    }
}
