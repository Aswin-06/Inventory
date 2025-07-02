package com.example.inventory.controller;

import com.example.inventory.model.Items;
import com.example.inventory.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ItemController {

    @Autowired
    private ItemService service;

    @PostMapping("/item")
    public ResponseEntity<?> putItems(@RequestBody Items item)
    {
        return service.putItems(item);
    }

    @GetMapping("/item")
    public List<Items> getItems()
    {
        return service.getItems();
    }

    @PutMapping("/item")
    public Items updateItems(@RequestBody Items item)
    {
        return service.updateItems(item);
    }

    @DeleteMapping("/item/{id}")
    public Items deleteItems(@PathVariable int id)
    {
        return service.deleteItem(id);
    }

    @GetMapping("/item/{id}")
    public Items getItem(@PathVariable int id)
    {
        return service.getItem(id);
    }
}
