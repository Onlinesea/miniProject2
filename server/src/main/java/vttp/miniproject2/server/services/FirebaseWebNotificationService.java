package vttp.miniproject2.server.services;

import java.io.StringReader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

@Service
public class FirebaseWebNotificationService {

  
    final String baseUrl="https://fcm.googleapis.com/fcm/send";
    private String token ="cZ-g9yHyutVwDDkw8dmaUI:APA91bH7ZLHOG97Y3Vi-ZTI3iZCJCRRGei_6bVskJ6Qgxnxdp4BcKW7lCIexBN0xM4ioqtbi0OXfAKlDAwEjj6l47FfEqO8X1BdcvATj3V8E8x7-Z2sOLIerI6toFBWWIl-ia7e14V9e";

    public String sendNotification(String message, String title){

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> resp=null;

        JsonObject notification = Json.createObjectBuilder()
                        .add("title",title)
                        .add("body",message)
                        .build();
        JsonObject body = Json.createObjectBuilder()
                        .add("notification", notification)
                        .add("to", token)
                        .build();
        System.out.println("payload Sent > " + body.toString());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setContentLength(body.toString().length());
        headers.set("Authorization", "key=AAAAVZQQ6Ng:APA91bHZsivexHyN-I4n4aIinuBeDcQUEhvGx2oHkxrxnsjJD9pxBZcNlNFKp6XOvT9uT3GTRqb3qFEjG9qeibbG8ui5RMAWsaEtKt_jdquIUiiQ0VHVtMUv5_yI7HMSQ-RtIOFuhNF3");
        try {
            resp= restTemplate.postForEntity(baseUrl, body, String.class, headers);
            JsonReader reader = Json.createReader(new StringReader(resp.getBody()));
            JsonObject respObject = reader.readObject();
            System.out.println("response received from google > " + respObject.toString());

            return respObject.toString();
        } catch (Exception e) {
            e.printStackTrace();        
        }
        return "error";
        
    
    }

    
}
