package nl.hu.adsd.dtmreserveringen.contoller;

import nl.hu.adsd.dtmreserveringen.entity.Reservation;
import nl.hu.adsd.dtmreserveringen.services.ReservationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(originPatterns = "http://localhost:[*]")
@RestController
@RequestMapping(path = "/reservation")
public class ReservationController {


    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Reservation>> getAllReservations() {
        Iterable<Reservation> reservationIterable = reservationService.getAllReservations();

        List<Reservation> reservationList = new ArrayList<>();

        reservationIterable.forEach(reservationList::add);

        return ResponseEntity.ok(reservationList);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteReservationById(@PathVariable Long id) {
        try {
            reservationService.deleteReservationById(id);
            return ResponseEntity.ok(HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
