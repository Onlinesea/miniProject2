package vttp.miniproject2.server.services;

import java.io.StringReader;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import vttp.miniproject2.server.models.JournalEntry;

@Service
public class QuoteService {

    private static final Logger logger = LoggerFactory.getLogger(QuoteService.class);
    
    private static String URL = "https://zenquotes.io/api/";

    public List<JournalEntry> getQuote (){
        
        RestTemplate template = new RestTemplate();
        ResponseEntity<String> resp = null;
        
        String quoteUrl = URL+"quotes";

        List<JournalEntry> quoteList; 

        logger.info("Trying to receive the json******************************");

        try{
            resp = template.getForEntity(quoteUrl, String.class);
            logger.info("resp received******************************");
            //logger.info(resp.getBody());

            quoteList= JournalEntry.createList(resp.getBody());

            return quoteList;
          
        }catch(Exception e){
            logger.error(e.getMessage());
            e.printStackTrace();
        }

         quoteList= new LinkedList<>();
         
        return quoteList;
    }
    public String getQuoteofTheDay(){
  
        RestTemplate template = new RestTemplate();
        ResponseEntity<String> resp = null;
        
        String quoteUrl = URL+"today";


        logger.info("Trying to receive the json******************************");

        
            resp = template.getForEntity(quoteUrl, String.class);
            logger.info("resp received******************************");
            //logger.info(resp.getBody());

            JsonReader reader = Json.createReader(new StringReader(resp.getBody()));
            JsonArray array = reader.readArray();
            JsonObject json = (JsonObject) array.get(0);
            String quoteMessage = json.getString("q");
            String quoteAuthor =json.getString("a");
            JsonObject result =Json.createObjectBuilder()
                                        .add("quoteMessage", quoteMessage)
                                        .add("quoteAuthor", quoteAuthor)
                                        .build();

        
        
         
        return result.toString();
    }

}
