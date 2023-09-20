package nl.hu.adsd.dtmreserveringen;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(originPatterns = "http://localhost:[*]")
@RestController
@RequestMapping(path="/status")
public class ProductStatusController {
    private static final Logger logger = LoggerFactory.getLogger(ProductStatusController.class);
    private final ProductStatusRepository productStatusRepository;

    @Autowired
    public ProductStatusController(ProductStatusRepository productStatusRepository) {
        this.productStatusRepository = productStatusRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductStatus> getProduct(@PathVariable long id) {
        logger.info(String.valueOf(id));
        Optional<ProductStatus> statusOptional = productStatusRepository.findById(id);

        if (statusOptional.isPresent()) {
            logger.info("product selected");
            return ResponseEntity.ok(statusOptional.get());
        } else {
            logger.info("product is not present with index value of {}",  id);
            return ResponseEntity.notFound().build(); // Return a 404 response
        }
    }
}
