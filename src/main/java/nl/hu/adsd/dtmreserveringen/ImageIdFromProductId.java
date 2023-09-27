package nl.hu.adsd.dtmreserveringen;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="productImageId")
public class ImageIdFromProductId {
    @Id
    private int productId;
    private String imageId;

    public int getId() {
        return productId;
    }

    public void setId(int productId) {
        this.productId = productId;
    }

    public int[] getImageId() {
        String[] idStrings = imageId.split(",");
        int[] idInts = new int[idStrings.length];

        int count = -1;
        for (String idString : idStrings) {
            idInts[++count] = Integer.parseInt(idString);
        }

        return idInts;
    }

    public void setImageID(String imageId) {
        this.imageId = imageId;
    }
}
