package vttp.miniproject2.server.controllers;

import java.io.StringReader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.annotation.PostConstruct;
import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import vttp.miniproject2.server.models.User;
import vttp.miniproject2.server.services.AccountService;

@RestController
@RequestMapping(path="/api")
public class JournalController {
    
    @Autowired
    private AccountService accSvc;

    @PostMapping(path = "/register")
    public ResponseEntity<String> registerUser(@RequestBody User user){

        // JsonReader reader = Json.createReader(new StringReader(user));
        // JsonObject json = reader.readObject();
        // System.out.println("RequestBody > " + user);
        System.out.println("User received >>> " + user.getUsername() );
        System.out.println("Password received >>> " +user.getPassword());
        accSvc.register(user);
        return ResponseEntity.ok().body("Success");
    }

    @PostMapping(path="/authenticate") 
    public ResponseEntity<String> authenticateUser(@RequestBody User user){
        Boolean result = accSvc.authenticateUser(user);

        result=true;

        if(result)
            return ResponseEntity.ok().body("Success");

        return 
    }
}
