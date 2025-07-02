package com.example.inventory.controller;

import com.example.inventory.model.Trans;
import com.example.inventory.model.Transaction;
import com.example.inventory.service.TransService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class TransController {

    @Autowired
    private TransService service;

    @GetMapping("/trans")
    public List<Transaction> getDetails()
    {
        return service.getDetails();
    }

    @PostMapping("/trans")
    public Transaction postDetails(@RequestBody Transaction trans)
    {
        return service.postDetails(trans);
    }

    @PutMapping("/trans")
    public Transaction updateDetails(@RequestBody Transaction trans)
    {
        return service.updateDetails(trans);
    }

    @DeleteMapping("/trans/{id}")
    public Transaction deleteDetails(@PathVariable int id)
    {
        return service.deleteDetails(id);
    }

    @GetMapping("/trans/{id}")
    public Transaction getDetail(@PathVariable int id)
    {
        return service.getDetail(id);
    }

    @GetMapping("/item/trans/{id}")
    public List<Trans> getItemTrans(@PathVariable int id)
    {
        return service.getItemTrans(id);
    }
}
