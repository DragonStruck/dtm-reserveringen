package nl.hu.adsd.dtmreserveringen;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "status")
public class ProductStatus {

    @Id
    private int id;
    private String name;

    public ProductStatus() {
        //currently no need for constructor
    }

    public void setStatus(String name) {
        this.name = name;
    }

    public String getStatus() {
        return name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
