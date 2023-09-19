package nl.hu.adsd.dtmreserveringen;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "type")
public class ProductType {

    @Id
    private int id;
    private String name;

    public ProductType() {
        //currently no need for constructor
    }

    public String getType() {
        return name;
    }

    public void setType(String type) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
