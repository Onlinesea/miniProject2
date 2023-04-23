package vttp.miniproject2.server.controllers;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.annotation.PostConstruct;
import vttp.miniproject2.server.dao.RoleDao;
import vttp.miniproject2.server.models.Role;
import vttp.miniproject2.server.models.User;
import vttp.miniproject2.server.services.UserRoleService;

@RestController
@RequestMapping(path="/api")
public class UserRoleController {

    @Autowired
    private UserRoleService svc;
    
    @Autowired
    private RoleDao roleDao;

    @PostMapping("/createRole")
    public Role createNewRole(@RequestBody Role role) {
        return svc.createNewRole(role);
    }
    @PostConstruct
    public void initRolesAndUsers() {
        svc.initRolesAndUser();
    }
    
    // User 
    @PostMapping("/registerUser")
    public User registerNewUser(@RequestBody User user) {
        Role role = roleDao.findById("User").get();
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        user.setRoles(roles);
        return svc.registerNewUser(user);
    }

    @GetMapping("/forUsers") 
    @PreAuthorize("hasRole('User')")
    public String forUsers() {
        return "This URL is accessible to all users.";
    }
}
