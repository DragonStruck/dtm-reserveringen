package nl.hu.adsd.dtmreserveringen.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "productImageIds")
public class ImagePathFromId {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int imageId;

    @ManyToOne
    @JoinColumn(name = "iamge_id")

    private Product product;

    @OneToOne(mappedBy = "imagePathFromId")
    private ProductImage productImage;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getImageId() {
        return imageId;
    }

    public void setImageId(int imageId) {
        this.imageId = imageId;
    }
}
