package nl.hu.adsd.dtmreserveringen.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @Column(columnDefinition = "LONGTEXT")
    private String description;

    @Column(columnDefinition = "LONGTEXT")
    private String details;

    @Column(columnDefinition = "LONGTEXT")
    private String contents;

    @OneToMany(mappedBy = "product", fetch = FetchType.EAGER)
    private List<Item> items;

    @OneToMany(mappedBy = "product", fetch = FetchType.EAGER)
    private List<Image> images;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public String getContents() {
        return contents;
    }

    public void setContents(String contents) {
        this.contents = contents;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", details='" + details + '\'' +
                ", contents='" + contents + '\'' +
                ", items=" + items +
                ", images=" + images +
                '}';
    }
}

