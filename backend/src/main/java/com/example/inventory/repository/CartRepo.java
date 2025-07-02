package com.example.inventory.repository;

import com.example.inventory.model.Cart;
import com.example.inventory.model.CartDto;
import com.example.inventory.model.Items;
import com.example.inventory.model.Transaction;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepo extends JpaRepository<Cart,Integer> {

    @Query("select new com.example.inventory.model.CartDto(c.itemid,i.name,i.price,c.quantity) from Cart c join Items i on c.itemid=i.id where c.userid=:id ")
    public List<CartDto> getItemsByUserid(@Param("id") int id);

    public List<Cart> findByUserid(int userid);

    @Transactional
    @Modifying
    @Query("delete from Cart where userid=:id")
    public void deleteCartItems(@Param("id") int id);

    @Transactional
    @Modifying
    @Query("update Items set quantity=:quantity where id=:id")
    public void updateItems(@Param("id") int id,@Param("quantity") int quantity);

    @Transactional
    @Modifying
    @Query("delete from Cart where itemid=:id")
    public void deleteCartItem(@Param("id") int id);
}
