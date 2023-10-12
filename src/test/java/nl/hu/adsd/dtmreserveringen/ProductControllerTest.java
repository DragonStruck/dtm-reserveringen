package nl.hu.adsd.dtmreserveringen;

import nl.hu.adsd.dtmreserveringen.entity.Product;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ProductControllerTest {

    @LocalServerPort
    private int port;

    private final RestTemplate restTemplate = new RestTemplate();


    @Test
    void getProduct() {
        String url = "http://localhost:" + port + "/product/1";

        ResponseEntity<Product> productResponseEntity = restTemplate.getForEntity(url, Product.class);

        Assertions.assertEquals(HttpStatus.OK, productResponseEntity.getStatusCode());
        Product product = productResponseEntity.getBody();
        assertNotNull(product);
        assertEquals(1, product.getId());
    }


}

//not relevant for this sprint
//    @Mock
//    ProductRepository productRepository;
//    @Mock
//    ProductController productController;
//    @Test
//    void addProductTest() {
//        ProductDTO testProduct = new ProductDTO(1, "name", "description", "details", "contents", "{\"ids\": \"1,2,3\"}");
//
//        doReturn(testProduct).when(productRepository).save(Mockito.any(Product.class));
//
//        ResponseEntity<Product> responseEntity = productController.addProduct(testProduct);
//
//        verify(productRepository, times(1)).save(testProduct);
//
//        assertAll(() -> {
//            assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
//
//            assertEquals(testProduct, responseEntity.getBody());
//        });
//
//    }

