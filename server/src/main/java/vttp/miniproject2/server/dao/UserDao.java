package vttp.miniproject2.server.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import vttp.miniproject2.server.models.User;

@Repository
public interface UserDao extends CrudRepository<User,String> {
    
}
