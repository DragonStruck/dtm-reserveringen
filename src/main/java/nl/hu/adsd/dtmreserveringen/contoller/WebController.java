package nl.hu.adsd.dtmreserveringen.contoller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebController {

    @RequestMapping("/")
    public String index() {
        return "index.html";
    }

    @RequestMapping("/product")
    public String product() {
        return "info-page.html";
    }

    @RequestMapping("/login")
    public String login() {
        return "login.html";
    }

    @RequestMapping("/register")
    public String register() {
        return "register.html";
    }

    @RequestMapping("/cart")
    public String cart() {
        return "cart.html";
    }

    @RequestMapping("/checkout")
    public String checkout() {
        return "checkout.html";
    }

    @RequestMapping("/admin")
    public String admin() {
        return "admin.html";
    }

    @RequestMapping("/test")
    public String test() {
        return "calendar-test.html";
    }

}