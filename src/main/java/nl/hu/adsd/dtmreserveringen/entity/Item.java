package nl.hu.adsd.dtmreserveringen.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JsonBackReference(value = "Product -> Items")
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @JsonBackReference(value = "Item -> ItemReservations")
    @OneToMany(mappedBy = "item", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<ItemReservation> itemReservations;
}
