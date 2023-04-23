package vttp.miniproject2.server.redis;

import vttp.miniproject2.server.models.JournalEntry;

public interface RedisRepo {
    public String cache (final JournalEntry entry);

    public JournalEntry findById(final String UserId);

    
}
