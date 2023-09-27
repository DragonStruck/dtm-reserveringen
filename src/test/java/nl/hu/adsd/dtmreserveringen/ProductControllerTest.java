package nl.hu.adsd.dtmreserveringen;

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
        String url = "http://localhost:" + port + "/product/";

        ResponseEntity<Product> productResponseEntity = restTemplate.getForEntity(url + "1", Product.class);

        Assertions.assertEquals(HttpStatus.OK, productResponseEntity.getStatusCode());
        Product product = productResponseEntity.getBody();
        assertNotNull(product);
        assertEquals(1, product.getId());
    }
}
