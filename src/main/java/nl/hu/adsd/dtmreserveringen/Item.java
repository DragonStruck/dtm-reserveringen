package nl.hu.adsd.dtmreserveringen;

import jakarta.persistence.*;

@Entity
@Table(name="item")
public class Item {

    @Id
    private long id;
    private int productId;

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
}
