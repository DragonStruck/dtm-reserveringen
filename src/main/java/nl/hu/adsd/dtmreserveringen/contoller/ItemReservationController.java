package nl.hu.adsd.dtmreserveringen.contoller;

import nl.hu.adsd.dtmreserveringen.entity.ItemReservation;
import nl.hu.adsd.dtmreserveringen.services.ItemReservationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@CrossOrigin(originPatterns = "http://localhost:[*]")
@RestController
@RequestMapping(path = "/api/item-reservation")
public class ItemReservationController {
    private static final Logger logger = LoggerFactory.getLogger(ItemReservationController.class);

    private final ItemReservationService itemReservationService;

    public ItemReservationController(ItemReservationService itemReservationService) {
        this.itemReservationService = itemReservationService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemReservation> getItemReservationById(@PathVariable Long id) {
        Optional<ItemReservation> itemReservationOptional = itemReservationService.getItemReservation(id);
        if (itemReservationOptional.isEmpty()) {
            logger.info("product is not present with index value of {}", id);
            return ResponseEntity.notFound().build();
        } else {
            logger.info("product found, id: {}", id);
            return ResponseEntity.ok(itemReservationOptional.get());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<ItemReservation>> getAllItemReservations() {
        Iterable<ItemReservation> itemReservationIterable = itemReservationService.getAllItemReservations();

        List<ItemReservation> itemReservationList  = new ArrayList<>();

        itemReservationIterable.forEach(itemReservationList::add);

        return ResponseEntity.ok(itemReservationList);
    }


    @PostMapping("/add")

    public ResponseEntity<HttpStatus> saveItemReservation(@RequestBody ItemReservation itemReservation) {

        HttpStatus httpStatus;
        try {
            httpStatus = itemReservationService.saveItemReservation(itemReservation);
        } catch (Exception e) {
            logger.info("something went wrong in addReservation reservation controller\nError: {}", e.toString());
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(httpStatus);
    }
}
