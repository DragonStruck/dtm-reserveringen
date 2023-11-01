package nl.hu.adsd.dtmreserveringen.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class ReservationDTO {
    private List<ItemReservationDTO> itemReservationDTOS;
  //  private AccountDTO accountDTO;
    private String email;
    private String message;
}
