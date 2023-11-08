package nl.hu.adsd.dtmreserveringen.contoller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebController {

    @RequestMapping("/")
    public String index() {
        return "html/index.html";
    }

    @RequestMapping("/product")
    public String product() {
        return "html/info-page.html";
    }

    @RequestMapping("/login")
    public String login() {
        return "html/login.html";
    }
    
    @RequestMapping("/register")
    public String register() {
        return "html/register.html";
    }

    @RequestMapping("/cart")
    public String cart() {
        return "html/cart.html";
    }

    @RequestMapping("/checkout")
    public String checkout() {
        return "html/checkout.html";
    }

    @RequestMapping("/admin")
    public String admin() {
        return "html/admin.html";
    }

    @RequestMapping("/test")
    public String test() {
        return "html/calendar-test.html";
    }

    @RequestMapping("/favicon.ico")
    public String favIcon() {
        return "icons/favicon.ico";
    }
}