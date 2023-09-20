package nl.hu.adsd.dtmreserveringen;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(originPatterns = "http:localhost:[*]")
@RestController
@RequestMapping(path = ("/imagePath"))
public class ImagePathFromIdController {
    private static final Logger logger = LoggerFactory.getLogger(ImagePathFromId.class);
    private final ImagePathFromIdRepository imagePathFromIdRepository;

    public ImagePathFromIdController(ImagePathFromIdRepository imagePathFromIdRepository) {
        this.imagePathFromIdRepository = imagePathFromIdRepository;
    }

    @RequestMapping("/{id}")
    public ResponseEntity<ImagePathFromId> getImagePathFromImageId(@PathVariable Long id) {
        Optional<ImagePathFromId> imagePathFromIdOptional = imagePathFromIdRepository.findById(id);

        if (imagePathFromIdOptional.isPresent()) {
            logger.info("product selected");
            return ResponseEntity.ok(imagePathFromIdOptional.get());
        } else {
            logger.info("product is not present with index value of {}",  id);
            return ResponseEntity.notFound().build(); // Return a 404 response
        }
    }
}
