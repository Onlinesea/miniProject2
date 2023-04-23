package vttp.miniproject2.server.redis;

import java.security.SecureRandom;
import java.time.Duration;
import java.util.Base64;
import java.util.concurrent.TimeUnit;

import org.apache.catalina.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import vttp.miniproject2.server.models.JournalEntry;


@Service
public class RedisService implements RedisRepo {
    
    private static final Logger logger = LoggerFactory.getLogger(RedisService.class);

    @Autowired
    @Qualifier("Entry")
    RedisTemplate<String, JournalEntry> redisTemplate;

    public int deleteRedisCache(String id){
        
        boolean isDeleted = redisTemplate.delete(id);
        if (isDeleted) {
            System.out.println("Entry deleted successfully");
            return 1;
        } else {
            System.out.println("Entry not found in Redis");
            return 0;
        }
    }

    @Override
    public String cache(JournalEntry entry){

        SecureRandom secureRandom = new SecureRandom();
        byte[] secretKey = new byte[32];
        secureRandom.nextBytes(secretKey);
        String encodedSecretKey = Base64.getEncoder().encodeToString(secretKey);
        System.out.println("Caching in redis ");
        redisTemplate.opsForValue().set(encodedSecretKey,entry,Duration.ofSeconds(300)); // the problem is this 
        System.out.println("Cach success ");

        //Quote result = (Quote)redisTemplate.opsForValue().get(quote.getId());
        return encodedSecretKey;
    }

    @Override
    public JournalEntry findById(String UserId) {
        logger.info("find journal by id> " + UserId);
        JournalEntry result = (JournalEntry) redisTemplate.opsForValue().get(UserId);
        logger.info(result.getAuthor());
        logger.info(result.getFeelings());
        logger.info(result.getQuoteMessage());
        logger.info(result.getThoughts());
        logger.info(result.getDate().toString());
        logger.info(result.getUser());
        logger.info("journal return" + result);
        return result;
    }

}
