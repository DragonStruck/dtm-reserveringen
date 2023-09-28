package nl.hu.adsd.dtmreserveringen.repository;

import nl.hu.adsd.dtmreserveringen.entity.ItemReservation;
import org.springframework.data.repository.CrudRepository;

public interface ItemReservationRepository extends CrudRepository<ItemReservation, Long> {
}
