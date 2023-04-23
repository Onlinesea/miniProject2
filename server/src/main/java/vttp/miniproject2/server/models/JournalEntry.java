package vttp.miniproject2.server.models;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.Serializable;
import java.sql.Date;
import java.util.LinkedList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;


@Component
public class JournalEntry implements Serializable {
    private static final Logger logger = LoggerFactory.getLogger(JournalEntry.class);

    private String user;
    private String quoteMessage;
    private String author;
    private String thoughts;
    private Date date;  
    private String feelings;

    public static List createList(String json) throws IOException{

        JournalEntry quote = new JournalEntry();

        List<JournalEntry> quoteList = new LinkedList<>();

        //Creating a List of Quote from the Json file received from the api
        try(InputStream is = new ByteArrayInputStream(json.getBytes())){
            JsonReader r = Json.createReader(is);
            JsonArray o = r.readArray();
            quoteList = o.stream()
                        .map(v->(JsonObject)v)
                        .map(v-> quote.createJournalEntry(v))
                        .toList(); 

            //RedisService svc = new RedisService();
            //Quote saveQuote = quoteList.get(1);
            //svc.save(saveQuote);            
        }

        return quoteList;
    }

    public static JournalEntry createJournalEntry(JsonObject v){

        JournalEntry quote = new JournalEntry();

        String message = v.getString("q"); 
        quote.setQuoteMessage(message);

        String author = v.getString("a");
        quote.setAuthor(author);   

        //logger.info("quote created******************************"); //Quote created is okay 

        return quote;
    }

    // public JsonObject JournalEntryToJson(JournalEntry journalEntry){

    //     return Json.createObjectBuilder()
    //             .add("user", journalEntry.getUser())
    //             .add("message", journalEntry.getQuoteMessage())
    //             .add("author", journalEntry.getAuthor())
    //             .add("thoughts", journalEntry.getThoughts())
    //             .add("date", journalEntry.getDate().toString())
    //             .add("feelings", journalEntry.getDate().toString())
    //             .build();
    // }

    public JsonObject JournalEntryToJson(){

        return Json.createObjectBuilder()
                .add("user", user)
                .add("message", quoteMessage)
                .add("author", author)
                .add("thoughts", thoughts)
                .add("date",date.toString())
                .add("feelings", feelings)
                .build();
    }



    public String getQuoteMessage() {
        return quoteMessage;
    }

    public void setQuoteMessage(String message) {
        this.quoteMessage = message;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getThoughts() {
        return thoughts;
    }

    public void setThoughts(String thoughts) {
        this.thoughts = thoughts;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getFeelings() {
        return feelings;
    }

    public void setFeelings(String feelings) {
        this.feelings = feelings;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    /*
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
 */

    
}
