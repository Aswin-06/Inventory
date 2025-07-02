package com.example.inventory.service;

import com.example.inventory.model.Users;
import com.example.inventory.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    @Autowired
    private UserRepo repo;

    public ResponseEntity<?> putUsers(Users user) {
        Users users=repo.findByEmail(user.getEmail());
        if(users==null)
        {
            repo.save(user);
            user=repo.findByEmail(user.getEmail());
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        return new ResponseEntity<>("email already exist",HttpStatus.BAD_REQUEST);
    }


    public Users getUser(int id) {
        return repo.findById(id).orElse(new Users());
    }

    public ResponseEntity<?> login(Users user) {
        Users users=repo.findByEmail(user.getEmail());
        if(users==null)
            return new ResponseEntity<>("please register to continue",HttpStatus.BAD_REQUEST);
        if(!users.getPassword().equals(user.getPassword()))
            return new ResponseEntity<>("You have entered wrong password",HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(users,HttpStatus.OK);
    }
}
