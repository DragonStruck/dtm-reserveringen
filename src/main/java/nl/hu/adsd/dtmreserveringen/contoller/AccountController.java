package nl.hu.adsd.dtmreserveringen.contoller;

import nl.hu.adsd.dtmreserveringen.entity.Account;
import nl.hu.adsd.dtmreserveringen.repository.AccountRepository;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(originPatterns = "http://localhost:[*]")
@RestController
@RequestMapping(path = "/api/account")
public class AccountController {

    private final AccountRepository accountRepository;

    public AccountController(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @PostMapping("/add")
    public void addAccount(@RequestBody Account account) {
        accountRepository.save(account);
    }
}