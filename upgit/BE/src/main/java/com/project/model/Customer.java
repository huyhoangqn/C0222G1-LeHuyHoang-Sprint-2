package com.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.model.account.AppUser;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String phoneNumber;

    @Column(columnDefinition = "text")
    private String address;

    @Column(columnDefinition = "text")
    private String image;

    @Column(columnDefinition = "bit(1) default 0")
    private Boolean status;

    @Column(columnDefinition = "bit(1) default 0")
    private Boolean isDeleted;

    private String email;

    @OneToMany(mappedBy = "customer")
    private List<ProductOrder> productOrderList;

    @OneToOne
    @JsonIgnore
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private AppUser appUser;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Customer customer = (Customer) o;
        return id != null && Objects.equals(id, customer.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
