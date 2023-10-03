package nl.hu.adsd.dtmreserveringen.services;

import nl.hu.adsd.dtmreserveringen.entity.Product;
import nl.hu.adsd.dtmreserveringen.repository.ProductRepository;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    public ProductService (ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product getProductWithImages(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public Long getAmountOfProducts() {
        return productRepository.count();
    }
}
