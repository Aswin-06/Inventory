package com.example.inventory.repository;


import com.example.inventory.model.Items;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepo extends JpaRepository<Items,Integer> {
    Items findByName(String name);
}
