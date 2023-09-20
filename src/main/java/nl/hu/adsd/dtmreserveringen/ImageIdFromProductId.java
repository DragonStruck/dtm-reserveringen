package nl.hu.adsd.dtmreserveringen;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="productImage")
public class imageIdFromProductId {
    @Id
    private int productId;
    private int imageId;

    public int getId() {
        return productId;
    }

    public void setId(int productId) {
        this.productId = imageIdFromProductId.this.productId;
    }

    public int getImageID() {
        return imageId;
    }

    public void setImageID(int imageID) {
        this.imageId = imageId;
    }
}
