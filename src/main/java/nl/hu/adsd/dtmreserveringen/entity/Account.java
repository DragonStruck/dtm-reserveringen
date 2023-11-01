package nl.hu.adsd.dtmreserveringen.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.List;

@Getter
@Setter
@ToString
@Entity
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    private String email;
    @NotNull
    private String password;

    @NotNull
    @Column(columnDefinition="Decimal(10) default '0'")
    private int admin;


//    @JsonBackReference(value = "Account -> Reservations")
//    @Fetch(FetchMode.JOIN)
//    @OneToMany(mappedBy = "account", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
//    private List<Reservation> reservations;
}

