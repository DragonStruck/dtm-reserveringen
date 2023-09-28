package nl.hu.adsd.dtmreserveringen.contoller;

import nl.hu.adsd.dtmreserveringen.entity.ImagePathFromId;
import nl.hu.adsd.dtmreserveringen.repository.ImagePathFromIdRepository;
import nl.hu.adsd.dtmreserveringen.entity.Product;
import nl.hu.adsd.dtmreserveringen.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(originPatterns = "http://localhost:[*]")
@RestController
@RequestMapping(path="/product")
public class ProductController {
    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    private final ImagePathFromIdRepository imagePathFromIdRepository;
    private final ProductRepository productRepository;


    public ProductController(ImagePathFromIdRepository imagePathFromIdRepository, ProductRepository productRepository) {
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

            int imageIdSize = product.getImageIds().size();
            List<String> imagePaths = new ArrayList<>(imageIdSize);
            List<String> imageAltTexts = new ArrayList<>(imageIdSize);

            for (Integer imageId : product.getImageIds()) {
                imagePaths.add(getImagePathFromImageId((long) imageId));
                imageAltTexts.add(getImageAltTextFromImageId((long) imageId));
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

//started working on this, but it's not relevant for this user story
//    @PostMapping("/add")
//    public ResponseEntity<Product> addProduct(@RequestBody ProductDto productDto) {
//        logger.info("");
//        logger.info(product.toString());
//        logger.info("");
//        productRepository.save(product);
//        return ResponseEntity.ok(product);
//    }
//
//    private ProductDto convertToDto(Product product) {
//        ProductDto productDto = modelMapper.map(post, PostDto.class);
//        postDto.setSubmissionDate(post.getSubmissionDate(),
//                userService.getCurrentUser().getPreference().getTimezone());
//        return postDto;
//    }


    @GetMapping("/amount")
    public ResponseEntity<Long> getAmountOfProducts() {
        return ResponseEntity.ok(productRepository.count());
    }
}

