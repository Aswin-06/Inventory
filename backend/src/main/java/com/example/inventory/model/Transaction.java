package com.example.inventory.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int itemid;
    private String type;
    private int quantity;
    private int userid;

    public Transaction(String type, int itemid, int quantity, int userid) {
        this.type = type;
        this.itemid = itemid;
        this.quantity = quantity;
        this.userid = userid;
    }
}
