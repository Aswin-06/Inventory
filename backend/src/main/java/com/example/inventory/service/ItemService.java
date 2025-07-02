package com.example.inventory.service;


import com.example.inventory.model.Items;
import com.example.inventory.repository.ItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {

    @Autowired
    private ItemRepo repo;

    public ResponseEntity<?> putItems(Items item) {
        Items items=repo.findByName(item.getName());
        if(items==null)
        {
            repo.save(item);
            item=repo.findByName(item.getName());
            return new ResponseEntity<>(item, HttpStatus.OK);
        }
        return new ResponseEntity<>("Product already available",HttpStatus.BAD_REQUEST);
    }

    public List<Items> getItems() {
        return repo.findAll();
    }

    public Items updateItems(Items item) {
        repo.save(item);
        return item;
    }

    public Items deleteItem(int id) {
        Items item=repo.findById(id).orElse(new Items());
        repo.delete(item);
        return item;
    }

    public Items getItem(int id) {
        Items item=repo.findById(id).orElse(new Items());
        return item;
    }
}
