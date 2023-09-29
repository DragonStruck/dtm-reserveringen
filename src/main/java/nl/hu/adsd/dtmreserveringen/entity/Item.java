package nl.hu.adsd.dtmreserveringen.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="item")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @OneToMany(mappedBy = "item")
    private List<ItemReservation> itemReservations;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

}
