package com.example.inventory.service;

import com.example.inventory.model.Cart;
import com.example.inventory.model.CartDto;
import com.example.inventory.model.Items;
import com.example.inventory.model.Transaction;
import com.example.inventory.repository.CartRepo;
import com.example.inventory.repository.ItemRepo;
import com.example.inventory.repository.TransRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    private CartRepo repo;
    private ItemRepo itemRepo;
    private TransRepo transRepo;

    @Autowired
    public CartService(CartRepo repo, ItemRepo itemRepo, TransRepo transRepo) {
        this.repo = repo;
        this.itemRepo = itemRepo;
        this.transRepo = transRepo;
    }

    public List<CartDto> getDetails(int userid) {
        return repo.getItemsByUserid(userid);
    }

    public Cart postItem(Cart cart) {
        List<Cart> carts=repo.findByUserid(cart.getUserid());
        Cart cart1=null;
        for(int i=0;i<carts.size();i++)
        {
            if(cart.getItemid()==carts.get(i).getItemid())
                cart1=carts.get(i);
        }
        if(cart1==null)
            return repo.save(cart);
        else
        {
            cart1.setQuantity(cart.getQuantity()+cart1.getQuantity());
            return repo.save(cart1);
        }
    }

    public ResponseEntity<?> buyItemInCart(int id) {
        List<CartDto> cart=repo.getItemsByUserid(id);
        for(int i=0;i<cart.size();i++)
        {
            Items item=itemRepo.findById(cart.get(i).getId()).orElse(new Items());
            repo.updateItems(cart.get(i).getId(),item.getQuantity()-cart.get(i).getQuantity());
            Transaction transaction=new Transaction("out",cart.get(i).getId(),cart.get(i).getQuantity(),id);
            transRepo.save(transaction);
        }
        repo.deleteCartItems(id);
        return new ResponseEntity<>("Order placed successful", HttpStatus.OK);
    }

    public ResponseEntity<?> deleteItem(int id) {
        repo.deleteCartItem(id);
        return new ResponseEntity<>("Product Removed Successfully",HttpStatus.OK);
    }
}
