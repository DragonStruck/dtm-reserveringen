package nl.hu.adsd.dtmreserveringen.contoller;

import nl.hu.adsd.dtmreserveringen.entity.Product;
import nl.hu.adsd.dtmreserveringen.services.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(originPatterns = "http://localhost:[*]")
@RestController
@RequestMapping(path = "/product")
public class ProductController {
    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        Product product = productService.getProductWithImages(id);


        if (product == null) {
            logger.info("product is not present with index value of {}", id);
            return ResponseEntity.notFound().build();
        } else {
            logger.info("product found, id: {}", id);
            return ResponseEntity.ok(product);
        }
    }


    @GetMapping("/amount")
    public ResponseEntity<Long> getAmountOfProducts() {
        return ResponseEntity.ok(productService.getAmountOfProducts());
    }
}

