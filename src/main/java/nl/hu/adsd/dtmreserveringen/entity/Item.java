package nl.hu.adsd.dtmreserveringen.entity;

import jakarta.persistence.*;

@Entity
@Table(name="item")
public class Item {

    @Id
    private long id;
    private int productId;

    @ManyToOne
    Item item;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }
}
