package nl.hu.adsd.dtmreserveringen.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import java.time.LocalDate;

@Getter
@Setter
@ToString
public class ItemReservationDTO {
    private LocalDate reservationDate;
    private int reservationPeriod;
    private ItemDTO itemDTO;

    public void setReservationDate(String reservationDate) {
        this.reservationDate = LocalDate.parse(reservationDate);
    }
}
