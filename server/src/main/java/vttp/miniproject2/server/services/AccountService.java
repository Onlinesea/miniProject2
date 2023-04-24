package vttp.miniproject2.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import vttp.miniproject2.server.models.Journal;
import vttp.miniproject2.server.models.JournalEntry;
import vttp.miniproject2.server.redis.RedisService;
import vttp.miniproject2.server.repositories.AccountRepository;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accRepo;
    
    @Autowired
    private RedisService redisSvc;

    public Journal getJournalByUser(String user) {
        
        return accRepo.getJournalByUser(user);
    }
    public int saveJournalEntry(JournalEntry je){
       return accRepo.insertNewEntry(je);
    }

    @Transactional
    public String deleteEntry(JournalEntry entry){
        JournalEntry cEntry= accRepo.getJournalEntryByEntry(entry);
        String key = redisSvc.cache(cEntry);
        accRepo.deleteEntry(cEntry);
        return key;
    }
    @Transactional
    public int deleteUserandJournal(String user){
        return accRepo.deleteUserandJournal(user);
    }
    @Transactional
    public int undoDelete(String id) {
        JournalEntry je= redisSvc.findById(id);
        accRepo.insertNewEntry(je);
        redisSvc.deleteRedisCache(id);
        return 1;
    }

    
}
