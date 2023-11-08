package nl.hu.adsd.dtmreserveringen.contoller;

import nl.hu.adsd.dtmreserveringen.entity.Item;
import nl.hu.adsd.dtmreserveringen.services.ItemService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@CrossOrigin(originPatterns = "http://localhost:[*]")
@RestController
@RequestMapping(path = "/api/item")
public class ItemController {
    private static final Logger logger = LoggerFactory.getLogger(ItemController.class);

    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable Long id) {
        Optional<Item> itemOptional = itemService.getItem(id);
        if (itemOptional.isEmpty()) {
            logger.info("item is not present with index value of {}", id);
            return ResponseEntity.notFound().build();
        } else {
            logger.info("item found, id: {}", id);
            return ResponseEntity.ok(itemOptional.get());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Item>> getAllItems() {
        Iterable<Item> itemIterable = itemService.getAllItems();

        List<Item> itemList  = new ArrayList<>();

        itemIterable.forEach(itemList::add);

        return ResponseEntity.ok(itemList);
    }
}
