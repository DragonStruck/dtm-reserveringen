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
    void testScenario() {
//        Deze code was van de starter-backend template van school
//        (werkt natuurlijk niet zonder de java files, maar dit gewoon als voorbeeld)
//
//
//        // Arrange
//        String url = "http://localhost:" + port + "/";
//
//        // Act
//        webDriver.navigate().to(url);
//
//        // Assert, initial greeter is there with a light theme
//        WebElement greeter = webDriver.findElement(By.id("greeter"));
//        assertEquals("Starter Project", webDriver.getTitle());
//        WebElement greeterParagraph = greeter.findElements(By.tagName("p")).iterator().next();
//        assertEquals(greeterParagraph.getAttribute("class"), "alert alert-light");
//
//        // Arrange
//        WebElement inputField = webDriver.findElement(By.id("inputName"));
//
//        // Act, fill in a name, submit and wait for the element to be replaced
//        inputField.sendKeys("henk");
//        inputField.submit();
//        WebDriverWait webDriverWait = new WebDriverWait(webDriver, Duration.ofMillis(1000));
//        webDriverWait.until(ExpectedConditions.stalenessOf(greeterParagraph));
//
//        // Assert, check if the name is present in the element with the success theme
//        greeterParagraph = greeter.findElements(By.tagName("p")).iterator().next();
//        assertTrue(greeterParagraph.getText().contains("henk"));
//        assertEquals(greeterParagraph.getAttribute("class"), "alert alert-success");

    }

    @AfterEach
    void closeWebDriver() {
        webDriver.close();
    }
}
