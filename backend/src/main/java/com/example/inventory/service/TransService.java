package com.example.inventory.service;

import com.example.inventory.model.Trans;
import com.example.inventory.model.Transaction;
import com.example.inventory.repository.TransRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransService {

    @Autowired
    private TransRepo repo;

    public List<Transaction> getDetails() {
        return repo.findAll();
    }

    public Transaction postDetails(Transaction tran) {
        List<Transaction> trans=repo.findByUserid(tran.getUserid());
        Transaction transaction=null;
        for(int i=0;i<trans.size();i++)
        {
            if(trans.get(i).getItemid()==tran.getItemid())
                transaction=trans.get(i);
        }
        if(transaction==null)
            return repo.save(tran);
        else
        {
            transaction.setQuantity(tran.getQuantity()+transaction.getQuantity());
            return repo.save(transaction);
        }
    }

    public Transaction updateDetails(Transaction trans) {
        repo.save(trans);
        return trans;
    }

    public Transaction deleteDetails(int id) {
        Transaction trans=repo.findById(id).orElse(new Transaction());
        repo.delete(trans);
        return trans;
    }

    public Transaction getDetail(int id) {
        return repo.findById(id).orElse(new Transaction());
    }

    public List<Trans> getItemTrans(int id) {
        return repo.getTrans(id);
    }
}
