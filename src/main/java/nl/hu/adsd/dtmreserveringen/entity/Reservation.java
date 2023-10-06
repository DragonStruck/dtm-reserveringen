package nl.hu.adsd.dtmreserveringen.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "reservation")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToMany(mappedBy = "reservation", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
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

    public List<ItemReservation> getItemReservations() {
        return itemReservations;
    }

    public void setItemReservations(List<ItemReservation> itemReservations) {
        this.itemReservations = itemReservations;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }
}
