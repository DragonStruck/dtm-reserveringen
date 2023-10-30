package nl.hu.adsd.dtmreserveringen.services;

import nl.hu.adsd.dtmreserveringen.entity.Item;
import nl.hu.adsd.dtmreserveringen.repository.ItemRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ItemService {
    private final Logger logger = LoggerFactory.getLogger(ItemService.class);

    private final ItemRepository itemRepository;

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public Iterable<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public Optional<Item> getItem(Long id) {
        return itemRepository.findById(id);
    }
}
