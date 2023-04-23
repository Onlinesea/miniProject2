package vttp.miniproject2.server.models;

import jakarta.json.Json;
import jakarta.json.JsonObject;

public class JwtResponse {

    private User user;
    private String jwtToken;
    
    public JwtResponse(User user, String jwtToken) {
        this.user = user;
        this.jwtToken = jwtToken;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public JsonObject toJson() {
        return Json.createObjectBuilder()
                    .add("username", user.getUsername())
                    .add("firstName", user.getFirstName())
                    .add("lastName", user.getLastName())
                    .add("jwtToken", jwtToken)
                    .build();
                    
                    
    } 

    
    
}
