package nl.hu.adsd.dtmreserveringen.contoller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(originPatterns = "http://localhost:[*]")
@RestController
@RequestMapping(path = "/admin")
public class AdminController {
    private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

    @Value("${ADMIN_PASSWORD}")
    private String correctPassword;

    @PostMapping("/login")
    public ResponseEntity<Boolean> isPasswordCorrect(@RequestBody String password) {
        logger.info(password, "input");
        logger.info(correctPassword, "correct password");
        return ResponseEntity.ok(password.equals(correctPassword));
    }
}
