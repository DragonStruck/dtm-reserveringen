package nl.hu.adsd.dtmreserveringen.repository;

import nl.hu.adsd.dtmreserveringen.entity.Reservation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends CrudRepository<Reservation, Long> {
}
