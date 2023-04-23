package vttp.miniproject2.server.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import vttp.miniproject2.server.models.Role;

@Repository
public interface RoleDao extends CrudRepository<Role, String> {
    
}
