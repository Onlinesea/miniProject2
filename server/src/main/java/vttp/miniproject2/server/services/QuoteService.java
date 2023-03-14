package vttp.miniproject2.server.services;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import vttp.miniproject2.server.models.Quote;

@Service
public class QuoteService {

    private static final Logger logger = LoggerFactory.getLogger(QuoteService.class);
    
    private static String URL = "https://zenquotes.io/api/quotes";

    public List<Quote> getQuote (){
        
        RestTemplate template = new RestTemplate();
        ResponseEntity<String> resp = null;
        
        String quoteUrl = URL;

        List<Quote> quoteList; 

        logger.info("Trying to receive the json******************************");

        try{
            resp = template.getForEntity(quoteUrl, String.class);
            logger.info("resp received******************************");
            //logger.info(resp.getBody());

            quoteList= Quote.createList(resp.getBody());

            return quoteList;
          
        }catch(Exception e){
            logger.error(e.getMessage());
            e.printStackTrace();
        }

         quoteList= new LinkedList<>();
         
        return quoteList;
    }

}
