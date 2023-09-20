package nl.hu.adsd.dtmreserveringen;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@CrossOrigin(originPatterns = "http:localhost:[*]")
@RestController
@RequestMapping(path=("/imageId"))
public class ImageIdFromProductIdController {
    private static final Logger logger = LoggerFactory.getLogger(ImageIdFromProductIdController.class);
    private final ImageIdFromProductIdRepository imageIdFromProductIdRepository;

    public ImageIdFromProductIdController(ImageIdFromProductIdRepository imageIdFromProductIdRepository) {
        this.imageIdFromProductIdRepository = imageIdFromProductIdRepository;
    }

    @RequestMapping("/{id}")
    public ResponseEntity<ImageIdFromProductId> getImageIdFromProductId(@PathVariable Long id) {
        Optional<ImageIdFromProductId> optional = imageIdFromProductIdRepository.findById(id);

        if (optional.isPresent()) {
            logger.info("product selected");
            return ResponseEntity.ok(optional.get());
        } else {
            logger.info("product is not present with index value of {}",  id);
            return ResponseEntity.notFound().build(); // Return a 404 response
        }
    }

}
