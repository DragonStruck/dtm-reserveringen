package nl.hu.adsd.dtmreserveringen.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import nl.hu.adsd.dtmreserveringen.dto.ItemReservationDTO;
import nl.hu.adsd.dtmreserveringen.dto.ReservationDTO;
import nl.hu.adsd.dtmreserveringen.entity.Account;
import nl.hu.adsd.dtmreserveringen.entity.Item;
import nl.hu.adsd.dtmreserveringen.entity.ItemReservation;
import nl.hu.adsd.dtmreserveringen.entity.Reservation;
import nl.hu.adsd.dtmreserveringen.repository.AccountRepository;
import nl.hu.adsd.dtmreserveringen.repository.ItemRepository;
import nl.hu.adsd.dtmreserveringen.repository.ItemReservationRepository;
import nl.hu.adsd.dtmreserveringen.repository.ReservationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class ReservationService {
    private static final Logger logger = LoggerFactory.getLogger(ReservationService.class);

    private final AccountRepository accountRepository;
    private final ItemReservationRepository itemReservationRepository;
    private final ReservationRepository reservationRepository;
    private final ItemRepository itemRepository;

    private final AccountService accountService;

    public ReservationService(ItemRepository itemRepository, AccountRepository accountRepository, ItemReservationRepository itemReservationRepository, ReservationRepository reservationRepository, AccountService accountService) {
        this.accountRepository = accountRepository;
        this.itemReservationRepository = itemReservationRepository;
        this.reservationRepository = reservationRepository;
        this.accountService = accountService;
        this.itemRepository = itemRepository;
    }


    public Iterable<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public void deleteReservationById(Long id) {
        try {
            reservationRepository.deleteById(id);
        } catch (Exception e) {
            logger.info("Reservation with id {} not found {}", id, e.toString());

        }
    }

    @Transactional
    public HttpStatus addReservation(ReservationDTO reservationDTO) {
        try {
            Reservation reservation = new Reservation();

            Optional<Account> accountOptional = accountRepository.findById(reservationDTO.getAccountDTO().getId());
            if (accountOptional.isEmpty()) {
                logger.error("Account not found");
                return HttpStatus.INTERNAL_SERVER_ERROR;
            }

            reservation.setAccount(accountOptional.get());

            List<ItemReservationDTO> itemReservationDTOS = reservationDTO.getItemReservationDTOS();
            List<ItemReservation> itemReservations = new ArrayList<>(itemReservationDTOS.size());

            for (ItemReservationDTO itemReservationDTO : itemReservationDTOS) {
                ItemReservation itemReservation = new ItemReservation();

                itemReservation.setReservation(reservation);
                itemReservation.setReservationDate(itemReservationDTO.getReservationDate());
                itemReservation.setReservationPeriod(itemReservationDTO.getReservationPeriod());

                Optional<Item> itemOptional = itemRepository.findById(itemReservationDTO.getItemDTO().getId());
                if (itemOptional.isEmpty()) {
                    logger.error("Item not found");
                    return HttpStatus.INTERNAL_SERVER_ERROR;
                }
                itemReservation.setItem(itemOptional.get());

                itemReservations.add(itemReservation);
            }
            reservation.setItemReservations(itemReservations);
            logger.info(reservation.toString());
            reservationRepository.save(reservation);
        } catch (Exception e) {
            logger.error("Error in addReservation Service; Error: {}", e.toString());
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return HttpStatus.OK;
    }
}

