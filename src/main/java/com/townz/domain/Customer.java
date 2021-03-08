package com.townz.domain;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Customer.
 */
@Entity
@Table(name = "customer")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Customer implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "token")
    private String token;

    @Column(name = "phone")
    private String phone;

    @Column(name = "sphone")
    private String sphone;

    @Column(name = "email")
    private String email;

    @Column(name = "profileimage")
    private String profileimage;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "is_first_booking")
    private Boolean isFirstBooking;

    @Column(name = "timecreated")
    private Instant timecreated;

    @OneToOne
    @JoinColumn(unique = true)
    private CustomerReferCode referFromCustomerId;

    @OneToOne
    @JoinColumn(unique = true)
    private Wallet wallet;

    @OneToMany(mappedBy = "customer")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Address> addresses = new HashSet<>();

    @OneToMany(mappedBy = "customer")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<CustomerReferCode> referToCustomerIds = new HashSet<>();

    @OneToMany(mappedBy = "cusomer")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<CusotmerNotification> notifications = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Customer name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getToken() {
        return token;
    }

    public Customer token(String token) {
        this.token = token;
        return this;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getPhone() {
        return phone;
    }

    public Customer phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getSphone() {
        return sphone;
    }

    public Customer sphone(String sphone) {
        this.sphone = sphone;
        return this;
    }

    public void setSphone(String sphone) {
        this.sphone = sphone;
    }

    public String getEmail() {
        return email;
    }

    public Customer email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProfileimage() {
        return profileimage;
    }

    public Customer profileimage(String profileimage) {
        this.profileimage = profileimage;
        return this;
    }

    public void setProfileimage(String profileimage) {
        this.profileimage = profileimage;
    }

    public Boolean isActive() {
        return active;
    }

    public Customer active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Boolean isIsFirstBooking() {
        return isFirstBooking;
    }

    public Customer isFirstBooking(Boolean isFirstBooking) {
        this.isFirstBooking = isFirstBooking;
        return this;
    }

    public void setIsFirstBooking(Boolean isFirstBooking) {
        this.isFirstBooking = isFirstBooking;
    }

    public Instant getTimecreated() {
        return timecreated;
    }

    public Customer timecreated(Instant timecreated) {
        this.timecreated = timecreated;
        return this;
    }

    public void setTimecreated(Instant timecreated) {
        this.timecreated = timecreated;
    }

    public CustomerReferCode getReferFromCustomerId() {
        return referFromCustomerId;
    }

    public Customer referFromCustomerId(CustomerReferCode customerReferCode) {
        this.referFromCustomerId = customerReferCode;
        return this;
    }

    public void setReferFromCustomerId(CustomerReferCode customerReferCode) {
        this.referFromCustomerId = customerReferCode;
    }

    public Wallet getWallet() {
        return wallet;
    }

    public Customer wallet(Wallet wallet) {
        this.wallet = wallet;
        return this;
    }

    public void setWallet(Wallet wallet) {
        this.wallet = wallet;
    }

    public Set<Address> getAddresses() {
        return addresses;
    }

    public Customer addresses(Set<Address> addresses) {
        this.addresses = addresses;
        return this;
    }

    public Customer addAddress(Address address) {
        this.addresses.add(address);
        address.setCustomer(this);
        return this;
    }

    public Customer removeAddress(Address address) {
        this.addresses.remove(address);
        address.setCustomer(null);
        return this;
    }

    public void setAddresses(Set<Address> addresses) {
        this.addresses = addresses;
    }

    public Set<CustomerReferCode> getReferToCustomerIds() {
        return referToCustomerIds;
    }

    public Customer referToCustomerIds(Set<CustomerReferCode> customerReferCodes) {
        this.referToCustomerIds = customerReferCodes;
        return this;
    }

    public Customer addReferToCustomerId(CustomerReferCode customerReferCode) {
        this.referToCustomerIds.add(customerReferCode);
        customerReferCode.setCustomer(this);
        return this;
    }

    public Customer removeReferToCustomerId(CustomerReferCode customerReferCode) {
        this.referToCustomerIds.remove(customerReferCode);
        customerReferCode.setCustomer(null);
        return this;
    }

    public void setReferToCustomerIds(Set<CustomerReferCode> customerReferCodes) {
        this.referToCustomerIds = customerReferCodes;
    }

    public Set<CusotmerNotification> getNotifications() {
        return notifications;
    }

    public Customer notifications(Set<CusotmerNotification> cusotmerNotifications) {
        this.notifications = cusotmerNotifications;
        return this;
    }

    public Customer addNotification(CusotmerNotification cusotmerNotification) {
        this.notifications.add(cusotmerNotification);
        cusotmerNotification.setCusomer(this);
        return this;
    }

    public Customer removeNotification(CusotmerNotification cusotmerNotification) {
        this.notifications.remove(cusotmerNotification);
        cusotmerNotification.setCusomer(null);
        return this;
    }

    public void setNotifications(Set<CusotmerNotification> cusotmerNotifications) {
        this.notifications = cusotmerNotifications;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Customer)) {
            return false;
        }
        return id != null && id.equals(((Customer) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Customer{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", token='" + getToken() + "'" +
            ", phone='" + getPhone() + "'" +
            ", sphone='" + getSphone() + "'" +
            ", email='" + getEmail() + "'" +
            ", profileimage='" + getProfileimage() + "'" +
            ", active='" + isActive() + "'" +
            ", isFirstBooking='" + isIsFirstBooking() + "'" +
            ", timecreated='" + getTimecreated() + "'" +
            "}";
    }
}
