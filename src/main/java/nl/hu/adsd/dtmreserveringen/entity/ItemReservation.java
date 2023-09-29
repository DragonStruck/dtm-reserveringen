package nl.hu.adsd.dtmreserveringen.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;


@Entity
@Table(name = "ItemReservation")
public class ItemReservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private LocalDate localDate;
    private int reservationPeriod;

    @ManyToOne
    @JoinColumn(name = "item_reservation_id")
    private Item item;

    @ManyToOne
    @JoinColumn(name = "reservation_id")
    private Reservation reservation;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LocalDate getLocalDate() {
        return localDate;
    }

    public void setLocalDate(LocalDate localDate) {
        this.localDate = localDate;
    }

    public int getReservationPeriod() {
        return reservationPeriod;
    }

    public void setReservationPeriod(int reservationPeriod) {
        this.reservationPeriod = reservationPeriod;
    }

}
