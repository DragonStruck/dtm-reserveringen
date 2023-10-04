package nl.hu.adsd.dtmreserveringen.repository;

import nl.hu.adsd.dtmreserveringen.entity.Account;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends CrudRepository<Account, Long> {
}
