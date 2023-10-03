package nl.hu.adsd.dtmreserveringen.repository;

import nl.hu.adsd.dtmreserveringen.entity.Product;
import org.springframework.data.repository.CrudRepository;
public interface ProductRepository extends CrudRepository<Product, Long> {

}

