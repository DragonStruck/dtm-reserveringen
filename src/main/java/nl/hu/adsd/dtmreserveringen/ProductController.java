package nl.hu.adsd.dtmreserveringen;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(originPatterns = "http://localhost:[*]")
@RestController
@RequestMapping(path="/product")
public class ProductController {
    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);
    private ProductRepository productRepository;
    /**
     * Select a random greeting template from the database and respond with the provided name filled in.
     *
     *
     * @return a GreetingResponse (will be serialized to JSON)
     */

    @GetMapping("/variables")
    public Product getProduct(@RequestParam long index) {
        logger.info(String.valueOf(index));
        Optional<Product> productOptional = productRepository.findById(index);

        if (productOptional.isPresent()) {
            logger.info("product selected");
            return productOptional.get();
        } else {
            logger.info("product is not present with index value of %d",  index);
            return null;
        }
    }
}

