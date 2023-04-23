package vttp.miniproject2.server.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import vttp.miniproject2.server.models.JwtRequest;
import vttp.miniproject2.server.models.JwtResponse;
import vttp.miniproject2.server.services.JwtService;

@RestController
@CrossOrigin
public class JWTRestController {
    @Autowired
    private JwtService jwtService;

    @PostMapping(path="/authenticate")
    // public ResponseEntity<String> createJwtToken(@RequestBody JwtRequest request) throws Exception {
    public JwtResponse createJwtToken(@RequestBody JwtRequest request) throws Exception {
        return jwtService.createJwtToken(request);
        // return ResponseEntity.ok(response.toJson().toString());
    }
}