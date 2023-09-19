package nl.hu.adsd.dtmreserveringen;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(originPatterns = "http://localhost:[*]")
@RestController
@RequestMapping(path="/type")
public class ProductTypeController {
    private static final Logger logger = LoggerFactory.getLogger(ProductTypeController.class);
    private final ProductTypeRepository productTypeRepository;

    @Autowired
    public ProductTypeController(ProductTypeRepository productTypeRepository) {
        this.productTypeRepository = productTypeRepository;
    }

    @GetMapping("/id")
    public ResponseEntity<ProductType> getProduct(@RequestParam long id) {
        logger.info(String.valueOf(id));
        Optional<ProductType> statusOptional = productTypeRepository.findById(id);

        if (statusOptional.isPresent()) {
            logger.info("product selected");
            return ResponseEntity.ok(statusOptional.get());
        } else {
            logger.info("product is not present with index value of {}",  id);
            return ResponseEntity.notFound().build(); // Return a 404 response
        }
    }
}
