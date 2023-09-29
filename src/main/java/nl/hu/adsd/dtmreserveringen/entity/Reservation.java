package nl.hu.adsd.dtmreserveringen.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "reservation")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToMany(mappedBy = "reservation")
    private List<ItemReservation> itemReservations;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
