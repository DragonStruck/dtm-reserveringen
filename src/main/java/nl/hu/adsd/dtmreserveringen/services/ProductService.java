package nl.hu.adsd.dtmreserveringen.services;

import nl.hu.adsd.dtmreserveringen.entity.Product;
import nl.hu.adsd.dtmreserveringen.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    public ProductService (ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Optional<Product> getProduct(Long id) {
        return productRepository.findById(id);
    }

    public Iterable<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Long getAmountOfProducts() {
        return productRepository.count();
    }
}
