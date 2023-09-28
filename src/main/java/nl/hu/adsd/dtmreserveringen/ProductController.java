package nl.hu.adsd.dtmreserveringen;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Optional;

@CrossOrigin(originPatterns = "http://localhost:[*]")
@RestController
@RequestMapping(path="/product")
public class ProductController {
    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    private final ItemRepository itemRepository;
    private final ImagePathFromIdRepository imagePathFromIdRepository;
    private final ProductRepository productRepository;


    public ProductController(ItemRepository itemRepository, ImagePathFromIdRepository imagePathFromIdRepository, ProductRepository productRepository) {
        this.itemRepository = itemRepository;
        this.imagePathFromIdRepository = imagePathFromIdRepository;
        this.productRepository = productRepository;
    }


    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        Optional<Product> productOptional = productRepository.findById(id);

        if (productOptional.isEmpty()) {
            logger.info("product is not present with index value of {}", id);
            return ResponseEntity.notFound().build(); //sends the status report
        } else {
            logger.info("product found, id: {}", id);
            Product product = productOptional.get();

            String[] imagePaths = new String[product.getImageIds().length];
            String[] imageAltTexts = new String[product.getImageIds().length];
            int count = -1;
            for (int imageId : product.getImageIds()) {
                ++count;
                imagePaths[count] = getImagePathFromImageId((long) imageId);
                imageAltTexts[count] = getImageAltTextFromImageId((long) imageId);
            }
            product.setImagePaths(imagePaths);
            product.setImageAltTexts(imageAltTexts);

            return ResponseEntity.ok(product);
        }
    }


    private String getImagePathFromImageId(Long id) {
        Optional<ImagePathFromId> optional = imagePathFromIdRepository.findById(id);

        if (optional.isPresent()) {
            logger.info("product image path selected");
            return optional.get().getImagePath();

        } else {
            logger.info("product image path is not present, id: {}",  id);
            return "";
        }
    }


    private String getImageAltTextFromImageId(Long id) {
        Optional<ImagePathFromId> optional = imagePathFromIdRepository.findById(id);

        if (optional.isPresent()) {
            logger.info("product image alt text selected");
            return optional.get().getAltText();

        } else {
            logger.info("product image alt text is not present, id: {}",  id);
            return "";
        }
    }


    @PostMapping("/add")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        logger.info("");
        logger.info(product.toString());
        logger.info("");
        productRepository.save(product);
        return ResponseEntity.ok(product);
    }


    @GetMapping("/amount")
    public ResponseEntity<Long> getAmountOfProducts() {
        return ResponseEntity.ok(itemRepository.count());
    }
}

