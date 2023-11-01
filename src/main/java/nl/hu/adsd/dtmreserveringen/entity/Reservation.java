package nl.hu.adsd.dtmreserveringen.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.List;

@Getter
@Setter
@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;


    @JsonManagedReference(value = "Reservation -> ItemReservations")
    @Fetch(FetchMode.JOIN)
    @OneToMany(mappedBy = "reservation", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<ItemReservation> itemReservations;


//    @JsonManagedReference(value = "Account -> Reservations")
//    @ManyToOne
//    @JoinColumn(name = "account_id")
//    private Account account;

    private String email;


    @Column(columnDefinition = "LONGTEXT")
    private String message;
}
