package com.example.inventory.repository;

import com.example.inventory.model.Trans;
import com.example.inventory.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransRepo extends JpaRepository<Transaction,Integer> {

    @Query("select new com.example.inventory.model.Trans(t.id,u.name,u.email,t.quantity) from Transaction t join Users u on u.id=t.userid where t.type='out' and t.itemid=:id")
    public List<Trans> getTrans(@Param("id") int id);

    public Transaction findByItemid(int id);

    public List<Transaction> findByUserid(int id);
}
