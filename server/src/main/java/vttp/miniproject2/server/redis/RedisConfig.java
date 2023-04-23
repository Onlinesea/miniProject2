package vttp.miniproject2.server.redis;


import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.jedis.JedisClientConfiguration;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.JdkSerializationRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import vttp.miniproject2.server.models.JournalEntry;


@Configuration
public class RedisConfig {
    private static final Logger logger = LoggerFactory.getLogger(RedisConfig.class);

    //initialising all the value for the redis properties
    @Value("${spring.redis.host}")
    private String redisHost;

    @Value("${spring.redis.port}")
    private Optional<Integer> redisPort;
    
    @Value("${spring.redis.password}")
    private String redisPassword;

    @Value("${spring.redis.database}")
    private String redisDatabse;

    @Bean(name= "Entry")
    @Scope("singleton")
    public RedisTemplate<String, JournalEntry> redisTemplate() {
        final RedisStandaloneConfiguration config = new RedisStandaloneConfiguration();
        config.setHostName(redisHost);
        config.setPort(redisPort.get());
        config.setPassword(redisPassword);
        

        Jackson2JsonRedisSerializer jackson2JsonJsonSerializer = new Jackson2JsonRedisSerializer(JournalEntry.class);

        //Building the configuration for jedisClient 
        final JedisClientConfiguration jedisClient = JedisClientConfiguration.builder().build();

        //Instancing a new connection factory that will then be used in the template 
        final JedisConnectionFactory jedisFac = new JedisConnectionFactory(config, jedisClient);

        //To preload the properties ?
        jedisFac.afterPropertiesSet();
        logger.info("redis host port > {redisHost} {redisPort}", redisHost, redisPort);

        //Instancing the redistemplate that will be used in the later time
        RedisTemplate<String, JournalEntry> template = new RedisTemplate<String, JournalEntry>();
 
        //Set up the connectionFactory and keySerializer with the template
        template.setConnectionFactory(jedisFac);
        template.setKeySerializer(new StringRedisSerializer());

        //what is the difference between this serializer and RedisSerializer<Object>Serializer 
        //since both are serializer for setValueSerializer ?
        //this serializer will require us to specify which kind of serializer that is required
        template.setValueSerializer(jackson2JsonJsonSerializer);
        template.setHashKeySerializer(template.getKeySerializer());
        template.setHashValueSerializer(template.getValueSerializer());
        return template;
    }
}