package vttp.miniproject2.server.controllers;

import java.io.StringReader;
import java.sql.Date;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.api.Http;
import com.google.firebase.messaging.FirebaseMessagingException;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;
import jakarta.json.JsonReader;
import jakarta.servlet.http.HttpServletRequest;
import vttp.miniproject2.server.models.Journal;
import vttp.miniproject2.server.models.JournalEntry;
import vttp.miniproject2.server.models.Note;
import vttp.miniproject2.server.models.User;
import vttp.miniproject2.server.redis.RedisService;
import vttp.miniproject2.server.services.AccountService;
import vttp.miniproject2.server.services.EmailService;
import vttp.miniproject2.server.services.FirebaseMessagingService;
import vttp.miniproject2.server.services.JwtService;
import vttp.miniproject2.server.services.QuoteService;
import vttp.miniproject2.server.utilities.JwtUtil;

@RestController
@RequestMapping(path="/api")
public class JournalController {

    @Autowired
    private JwtService jwtSvc;

    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private FirebaseMessagingService firebaseService;

    @Autowired
    private EmailService emailSvc;

    // @Autowired
    // private FirebaseWebNotificationService fireSvc;

    @Autowired
    private AccountService accSvc;
    @Autowired
    private RedisService redisSvc;

    @Autowired
    private QuoteService quoteSvc;

    @GetMapping(path="/journal")
    @PreAuthorize("hasRole('User')")
    public ResponseEntity<String> retrieveJournalList(@RequestParam String user){
        Journal result = accSvc.getJournalByUser(user);
        System.out.println(result.getUser());

        System.out.println(result.toJson().toString());

        
        return ResponseEntity.ok().body(result.toJson().toString());
        // return ResponseEntity.ok().body("ok");

    }

    @PostMapping(path="/saveEntry")
    @PreAuthorize("hasRole('User')")
    public ResponseEntity<String> saveJournalEntry(@RequestBody String dataString ){
        System.out.println("JournalEntry received from angular > " + dataString);
       StringReader reader = new StringReader(dataString);
        JsonReader jsonReader = Json.createReader(reader);
       JsonObject jsonObject = jsonReader.readObject();
       
       JournalEntry entry = new JournalEntry();
       entry.setUser(jsonObject.getString("user"));
       entry.setQuoteMessage(jsonObject.getString("message"));
       entry.setAuthor(jsonObject.getString("author"));
       entry.setThoughts(jsonObject.getString("thoughts"));

    //    Changing the date format based on local timezone
        LocalDate localDate = ZonedDateTime.parse(jsonObject.getString("date"))
                            .withZoneSameInstant(ZoneId.systemDefault())
                            .toLocalDate();
       entry.setDate(Date.valueOf(localDate));
       entry.setFeelings(jsonObject.getString("feelings"));
        
        int result = accSvc.saveJournalEntry(entry);

        if(result ==1 ){
            JsonObjectBuilder json = Json.createObjectBuilder()
            .add("saved", "true");
            return ResponseEntity.ok().body(json.build().toString());
        }
        JsonObjectBuilder json = Json.createObjectBuilder()
            .add("saved", "false");
        return ResponseEntity.status(HttpStatusCode.valueOf(404)).body(json.build().toString());
    }


    @GetMapping(path="/QuoteApi")
    public ResponseEntity<String> retrieveQuoteofTheDay(){
        // String resp = fireSvc.sendNotification("Hello from Xinhai", "Greetings");
        return ResponseEntity.ok().body(quoteSvc.getQuoteofTheDay());
        // return ResponseEntity.ok().body("ok");
    }


    @PutMapping("/deleteEntry")
    @PreAuthorize("hasRole('User')")
    public ResponseEntity<String> deleteJournalEntry(@RequestParam String date, @RequestParam String user) {
        System.out.println(" delete Entry > " + date);
        String key="1";
        key = accSvc.deleteEntry(date, user);

        if(!key.equals("1") ){
            JsonObjectBuilder json = Json.createObjectBuilder()
            .add("deleted", "true")
            .add("key", key);
            return ResponseEntity.ok().body(json.build().toString());
        }
        JsonObjectBuilder json = Json.createObjectBuilder()
                                    .add("deleted", "false");
        return ResponseEntity.status(HttpStatusCode.valueOf(404)).body(json.build().toString());
    }

    @PostMapping("/undo")
    @PreAuthorize("hasRole('User')")
    public ResponseEntity<String> undoDeletion(@RequestBody String id) {
        System.out.println("id> " + id);
        int result =0;
        result = accSvc.undoDelete(id);
        if(result ==1 ){
            JsonObjectBuilder json = Json.createObjectBuilder()
            .add("undo", "true");
            return ResponseEntity.ok().body(json.build().toString());
        }
        JsonObjectBuilder json = Json.createObjectBuilder()
                                    .add("undo", "false");
        return ResponseEntity.status(HttpStatusCode.valueOf(404)).body(json.build().toString());
    }

    @DeleteMapping("/account")
    @PreAuthorize("hasRole('User')")
    public ResponseEntity<String> deleteAccount(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7); // Extract the JWT token from the request header
        String userId = jwtUtil.extractUsername(token); // Decode the JWT token to retrieve the user id
        int result = accSvc.deleteUserandJournal(userId);
        if(result ==1 ){
            JsonObjectBuilder json = Json.createObjectBuilder()
            .add("deleted", "true");
            return ResponseEntity.ok().body(json.build().toString());
        }
        JsonObjectBuilder json = Json.createObjectBuilder()
                                    .add("deleted", "false");
        return ResponseEntity.status(HttpStatusCode.valueOf(404)).body(json.build().toString());
    }

    // @RequestMapping("/send-notification")
    // @ResponseBody
    // @PreAuthorize("hasRole('User')")
    // public String sendNotification(@RequestBody Note note,
    //                             @RequestParam String token) throws FirebaseMessagingException {

    //     return firebaseService.sendNotification(note, token);
    // }
    @RequestMapping("/sendNotification")
    @ResponseBody
    @PreAuthorize("hasRole('User')")
    public ResponseEntity<String> sendNotification(@RequestBody String payload) throws FirebaseMessagingException, InterruptedException, ExecutionException {
        StringReader reader = new StringReader(payload);
        JsonReader jsonReader = Json.createReader(reader);
       JsonObject jsonObject = jsonReader.readObject();
       String title = jsonObject.getString("title");
       String message = jsonObject.getString("message");
       String token = jsonObject.getString("token");

        String result = firebaseService.sendMessage(title, message, token);
        System.out.println("result > " + result);
        JsonObjectBuilder json = Json.createObjectBuilder()
                            .add("Sent", "true");


        return ResponseEntity.ok().body(json.build().toString());

    }

    @PostMapping("/sendEmail")
    @PreAuthorize("hasRole('User')")
    public ResponseEntity<String> sendEmail(@RequestBody String dataString) {
        System.out.println("sendEmail trigger");
        System.out.println("Received from angualr email to send " + dataString);
        StringReader reader = new StringReader(dataString);
        JsonReader jsonReader = Json.createReader(reader);
       JsonObject jO = jsonReader.readObject();
        
        emailSvc.sendEmail(jO.getString("to"), jO.getString("subject"), jO.getString("body"));
   
            JsonObjectBuilder json = Json.createObjectBuilder()
            .add("deleted", "true");
            return ResponseEntity.ok().body(json.build().toString());
     
    }

}
