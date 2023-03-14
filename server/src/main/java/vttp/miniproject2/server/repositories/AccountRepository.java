package vttp.miniproject2.server.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import vttp.miniproject2.server.models.User;
import static vttp.miniproject2.server.repositories.Queries.*;

@Repository
public class AccountRepository {
    
    @Autowired
    private JdbcTemplate template;


    public void registerUser(User user){
        int result = template.update(INSERT_NEW_USER, user.getUsername(),user.getPassword());
    }


    public Boolean authenticateUser(User user) {

        // TODO
        return null;
    }
}
