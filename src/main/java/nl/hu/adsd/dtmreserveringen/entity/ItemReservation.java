package nl.hu.adsd.dtmreserveringen.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;


@Getter
@Setter
@Entity
@ToString
@NoArgsConstructor
@Table(name = "item_reservation")
public class ItemReservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    private LocalDate reservationDate;
    @NotNull
    private int reservationPeriod;


    @JsonManagedReference(value = "Item -> ItemReservations")
    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;

    @JsonBackReference(value = "Reservation -> ItemReservations")
    @ManyToOne
    @JoinColumn(name = "reservation_id")
    private Reservation reservation;
}
