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

    private final ProductRepository productRepository;
    private final ProductStatusRepository productStatusRepository;
    private final ProductTypeRepository productTypeRepository;
    private final ImageIdFromProductIdRepository imageIdFromProductIdRepository;
    private final ImagePathFromIdRepository imagePathFromIdRepository;


    public ProductController(ProductRepository productRepository, ProductTypeRepository productTypeRepository, ImageIdFromProductIdRepository imageIdFromProductIdRepository, ImagePathFromIdRepository imagePathFromIdRepository, ProductStatusRepository productStatusRepository) {
        this.productRepository = productRepository;
        this.productTypeRepository = productTypeRepository;
        this.imageIdFromProductIdRepository = imageIdFromProductIdRepository;
        this.imagePathFromIdRepository = imagePathFromIdRepository;
        this.productStatusRepository = productStatusRepository;
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
            product.setStatusString(getProductStatus((long) product.getStatusId()));

            product.setImageIds(getImageIdFromProductId(id));
            String[] imagePaths = new String[product.getImageIds().length];
            String[] imageAltTexts = new String[product.getImageIds().length];
            int count = -1;
            for (int imageId : product.getImageIds()) {
                imagePaths[++count] = getImagePathFromImageId((long) imageId);
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


    private String getProductStatus(Long id) {
        Optional<ProductStatus> statusOptional = productStatusRepository.findById(id);
        if (statusOptional.isPresent()) {
            logger.info("product status selected");
            return statusOptional.get().getName();
        } else {
            logger.info("product status is not present, id: {}",  id);
            return"";
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
        return ResponseEntity.ok(productRepository.count());
    }
}

