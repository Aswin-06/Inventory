package com.example.inventory.controller;

import com.example.inventory.model.Cart;
import com.example.inventory.model.CartDto;
import com.example.inventory.model.Items;
import com.example.inventory.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class CartController {

    @Autowired
    private CartService service;

    @GetMapping("/cart/{userid}")
    public List<CartDto> getDetail(@PathVariable int userid)
    {
        return service.getDetails(userid);
    }

    @PostMapping("/cart")
    public Cart postItem(@RequestBody Cart cart)
    {
        return service.postItem(cart);
    }

    @DeleteMapping("/cart/buy/{id}")
    public ResponseEntity<?> buyItemInCart(@PathVariable int id)
    {
        return service.buyItemInCart(id);
    }

    @DeleteMapping("/cart/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable int id)
    {
        return service.deleteItem(id);
    }
}
