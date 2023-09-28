package nl.hu.adsd.dtmreserveringen;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class IndexHtmlTest {
    @LocalServerPort
    private int port;
    private WebDriver webDriver;

    @BeforeEach
    void setupWebDriver() {
        webDriver = new FirefoxDriver();
    }

    @Test
    void testTitle() {
        String url = "http://localhost:" + port + "/";
        webDriver.navigate().to(url);
        assertEquals("Home | DTM Reserveringen", webDriver.getTitle());
    }

    @AfterEach
    void closeWebDriver() {
        webDriver.close();
    }
}
