package com.example.inventory.controller;

import com.example.inventory.model.Users;
import com.example.inventory.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping("/register")
    public ResponseEntity<?> putUsers(@RequestBody Users user)
    {
        return service.putUsers(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Users user)
    {
        return service.login(user);
    }

    @GetMapping("/user/{id}")
    public Users getUser(@PathVariable int id)
    {
        return service.getUser(id);
    }
}
