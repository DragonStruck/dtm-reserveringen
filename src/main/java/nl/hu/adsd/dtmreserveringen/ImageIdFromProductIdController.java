package nl.hu.adsd.dtmreserveringen;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;


@CrossOrigin(originPatterns = "http:localhost:[*]")
@RestController
@RequestMapping(path=("/imageId"))
public class ImageIdFromProductIdController {
    private static final Logger logger = LoggerFactory.getLogger(ImageIdFromProductIdController.class);
    private final ImageIdFromProductIdRepository imageIdFromProductIdRepository;

    public ImageIdFromProductIdController(ImageIdFromProductIdRepository imageIdFromProductIdRepository) {
        this.imageIdFromProductIdRepository = imageIdFromProductIdRepository;
    }

    @RequestMapping("/productId")
    public ResponseEntity<imageIdFromProductId> getImageIdFromProductId(@RequestParam Long id) {
        Optional<imageIdFromProductId> imageIdOptional = imageIdFromProductIdRepository.findById(id);

        if (imageIdOptional.isPresent()) {
            logger.info("product selected");
            return ResponseEntity.ok(imageIdOptional.get());
        } else {
            logger.info("product is not present with index value of {}",  id);
            return ResponseEntity.notFound().build(); // Return a 404 response
        }
    }

}
