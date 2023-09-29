package nl.hu.adsd.dtmreserveringen.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "productImage")
public class ProductImage {
    @Id
    @Column(insertable=false, updatable=false)
    private int id;
    private String altText;
    private String imagePath;

    @OneToOne
    @JoinColumn(name = "id")
    private ImagePathFromId imagePathFromId;


    public String getAltText() {
        return altText;
    }

    public void setAltText(String altText) {
        this.altText = altText;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getImagePath() {
        return "images/" + imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
}
