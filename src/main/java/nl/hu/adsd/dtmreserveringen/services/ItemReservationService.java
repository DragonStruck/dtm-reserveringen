package nl.hu.adsd.dtmreserveringen.services;

import nl.hu.adsd.dtmreserveringen.entity.ItemReservation;
import nl.hu.adsd.dtmreserveringen.repository.ItemReservationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ItemReservationService {
    private final Logger logger = LoggerFactory.getLogger(ItemReservationService.class);

    private final ItemReservationRepository itemReservationRepository;

    public ItemReservationService(ItemReservationRepository itemReservationRepository) {
        this.itemReservationRepository = itemReservationRepository;
    }

    public HttpStatus saveItemReservation(ItemReservation itemReservation) {
        try {
            itemReservationRepository.save(itemReservation);
            return HttpStatus.OK;
        } catch (Exception e) {
            logger.warn("Item Reservation failed to save {}", e.toString());
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    public Iterable<ItemReservation> getAllItemReservations() {
        return itemReservationRepository.findAll();
    }

    public Optional<ItemReservation> getItemReservation(Long id) {
        return itemReservationRepository.findById(id);
    }
}
