package nl.hu.adsd.dtmreserveringen;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;


@Entity
@Table(name = "ItemReservation")
public class ItemReservation {
    @Id
    private int id;
    private LocalDate localDate;
    private int reservationPeriod;
    private int reservationId;
    private int itemId;

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

    public int getReservationId() {
        return reservationId;
    }

    public void setReservationId(int reservationId) {
        this.reservationId = reservationId;
    }

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }
}
