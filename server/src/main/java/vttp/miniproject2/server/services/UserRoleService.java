package vttp.miniproject2.server.services;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import vttp.miniproject2.server.dao.RoleDao;
import vttp.miniproject2.server.dao.UserDao;
import vttp.miniproject2.server.models.Role;
import vttp.miniproject2.server.models.User;

@Service
public class UserRoleService {

    @Autowired
    private UserDao userDao;

    @Autowired 
    private RoleDao roleDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void initRolesAndUser() {
        Role adminRole = new Role();
        adminRole.setRoleName("Admin");
        adminRole.setRoleDescription("Admin role with elevated privileges");
        roleDao.save(adminRole);

        Role userRole = new Role();
        userRole.setRoleName("User");
        userRole.setRoleDescription("Default user role for newly created users");
        roleDao.save(userRole);

        User adminUser = new User();
        adminUser.setFirstName("Admin");
        adminUser.setLastName("Tan");
        adminUser.setUsername("adminUserBossMan");
        adminUser.setPassword(getEncodedPassword("adminPassword"));
        Set<Role> adminRoles = new HashSet<>();
        adminRoles.add(adminRole);
        adminUser.setRoles(adminRoles);
        userDao.save(adminUser);
    }

    public User registerNewUser(User user) {
        Role role = roleDao.findById("User").get();
        Set<Role> userRoles = new HashSet<>();
        userRoles.add(role);
        user.setRoles(userRoles);
        user.setPassword(getEncodedPassword(user.getPassword()));
        return userDao.save(user);
    }

    public String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }
    
    public Role createNewRole(Role role) {
        return roleDao.save(role);
    }
}
