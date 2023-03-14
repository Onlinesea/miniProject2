package vttp.miniproject2.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vttp.miniproject2.server.models.User;
import vttp.miniproject2.server.repositories.AccountRepository;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accRepo;
    

    public void register (User user){
        accRepo.registerUser(user);
    }


    public Boolean authenticateUser(User user) {
        //TODO 
        return accRepo.authenticateUser(user);
    }
}
