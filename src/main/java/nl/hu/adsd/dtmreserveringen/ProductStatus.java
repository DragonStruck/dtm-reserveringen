package nl.hu.adsd.dtmreserveringen;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration;

@Entity
@Table(name = "productStatus")
public class ProductStatus {

    @Id
    private int id;
    private String name;

    public ProductStatus() {
        //currently no need for constructor
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
