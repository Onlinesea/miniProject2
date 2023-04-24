package vttp.miniproject2.server.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import vttp.miniproject2.server.models.Journal;
import vttp.miniproject2.server.models.JournalEntry;
import vttp.miniproject2.server.models.User;
import static vttp.miniproject2.server.repositories.Queries.*;

import java.util.LinkedList;
import java.util.List;

@Repository
public class AccountRepository {
    
    @Autowired
    private JdbcTemplate template;

    public Journal getJournalByUser(String user) {
        System.out.println("Retriving journal for user > " + user);

        SqlRowSet rs = template.queryForRowSet(GET_JOURNAL_BY_USER, user);
        Journal journal = new Journal();
        journal.setUser(user);
        List<JournalEntry> journalList = new LinkedList<>(); 

        while(rs.next()){
            JournalEntry entry = new JournalEntry();
            entry.setUser(user);
            entry.setQuoteMessage(rs.getString("quoteMessage"));
            entry.setAuthor(rs.getString("author"));
            entry.setThoughts(rs.getString("thoughts"));
            entry.setDate(rs.getDate("date"));
            entry.setFeelings(rs.getString("feeling"));
            journalList.add(entry);
        }
        System.out.println("Retriving journal for user > " + journal.getUser());
        journal.setEntryList(journalList);

        return journal;
    }
    
    public int insertNewEntry(JournalEntry je){
        int result=template.update(INSERT_NEW_ENTRY,je.getUser(), je.getQuoteMessage(), 
                    je.getAuthor(),je.getThoughts(),je.getDate(),je.getFeelings());

                    System.out.println("result >> " + result);


        return result;
    }
    public int deleteEntry(JournalEntry je){
        int result=template.update(DELETE_ENTRY_BY_ENTRY,je.getUser(),
        je.getDate(), je.getQuoteMessage(),je.getThoughts());
        return result;
    }

    @Transactional
    public int deleteUserandJournal(String user) {
        
        template.update(DELETE_USER_ROLE, user);
        template.update(DELETE_USER_JOURNAL, user);
        template.update(DELETE_USER, user);
        return 1;
    }

    public JournalEntry getJournalEntryByEntry(JournalEntry je) {
        SqlRowSet rs = template.queryForRowSet(GET_ENTRY_BY_ENTRY,je.getUser(), je.getQuoteMessage(), 
        je.getAuthor(),je.getThoughts(),je.getDate(),je.getFeelings());
        JournalEntry entry = new JournalEntry();
        while(rs.next()){
            entry.setUser(rs.getString("user"));
            entry.setQuoteMessage(rs.getString("quoteMessage"));
            entry.setAuthor(rs.getString("author"));
            entry.setThoughts(rs.getString("thoughts"));
            entry.setDate(rs.getDate("date"));
            entry.setFeelings(rs.getString("feeling"));
        }
        return entry; 
    }
    
}
