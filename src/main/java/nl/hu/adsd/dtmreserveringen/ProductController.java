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
    private final ProductTypeRepository productTypeRepository;
    private final ImageIdFromProductIdRepository imageIdFromProductIdRepository;
    private final ImagePathFromIdRepository imagePathFromIdRepository;
    private final ProductRepository productRepository;


    public ProductController(ItemRepository itemRepository, ProductTypeRepository productTypeRepository, ImageIdFromProductIdRepository imageIdFromProductIdRepository, ImagePathFromIdRepository imagePathFromIdRepository, ProductRepository productRepository) {
        this.itemRepository = itemRepository;
        this.productTypeRepository = productTypeRepository;
        this.imageIdFromProductIdRepository = imageIdFromProductIdRepository;
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

            product.setTypeString(getProductType((long) product.getTypeId()));

            product.setImageIds(getImageIdFromProductId(id));
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


    private String getProductType(Long id) {
        Optional<ProductType> typeOptional = productTypeRepository.findById(id);

        if (typeOptional.isPresent()) {
            logger.info("product type selected");
            return typeOptional.get().getName();
        } else {
            logger.info("product type is not present, id: {}",  id);
            return "";
        }
    }


    private int[] getImageIdFromProductId(Long id) {
        Optional<ImageIdFromProductId> optional = imageIdFromProductIdRepository.findById(id);
        if (optional.isPresent()) {
            logger.info("product id selected");
            return optional.get().getImageId();
        } else {
            logger.info("product id is not present, id: {}",  id);
            return new int[0];
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


    @GetMapping("/amount")
    public ResponseEntity<Long> getAmountOfProducts() {
        return ResponseEntity.ok(itemRepository.count());
    }
}

