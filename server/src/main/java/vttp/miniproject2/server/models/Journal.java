package vttp.miniproject2.server.models;


import java.beans.JavaBean;
import java.io.Serializable;
import java.util.LinkedList;
import java.util.List;

import org.springframework.stereotype.Component;


import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;

@Component
public class Journal implements Serializable {

    private String user;
    private static List<JournalEntry> entryList = new LinkedList<>();
    public static JournalEntry currentEntry = new JournalEntry();
    
    public JsonObject toJson() {

        System.out.println("Building Journal for > " + user);
        JsonObjectBuilder json = Json.createObjectBuilder()
        .add("user", user);

        //build array if comments is not null
        if(entryList != null) {
            System.out.println("Building JournalEntryList");
            JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
            entryList.forEach(c-> arrayBuilder.add(c.JournalEntryToJson()));
            JsonArray entryListArray = arrayBuilder.build();
            json.add("journalList", entryListArray);
        }
        return json.build();
    }

    public Journal(){

    }
    public Journal(String User){
        this.user= User; 
    }

    public String getUser() {
        return user;
    }
    public void setUser(String user) {
        this.user = user;
    }
    
    public List<JournalEntry> getEntryList() {
        return entryList;
    }

    public void setEntryList(List<JournalEntry> entryList) {
        this.entryList = entryList;
    }

    public static JournalEntry getCurrentEntry() {
        return currentEntry;
    }

    public static void setCurrentEntry(JournalEntry currentEntry) {
        Journal.currentEntry = currentEntry;
    }

    public static void addQuote(JournalEntry quote){
            
       entryList.add(quote);
    }
    
}
