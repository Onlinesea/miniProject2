package vttp.miniproject2.server;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.StringReader;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

@Configuration
public class FirebaseConfig {
    
    // @Value("${fire.service.account}")
    // private String config;
    
    @Value("${FIREBASE_SERVICE_ACCOUNT}")
    private String config;


    @Bean
    public FirebaseMessaging firebaseMessaging() throws IOException {
            GoogleCredentials googleCredentials = GoogleCredentials.fromStream(
                    new ByteArrayInputStream(config.getBytes(StandardCharsets.UTF_8))
            );
    // GoogleCredentials googleCredentials = GoogleCredentials
    //         .fromStream(new ClassPathResource("firebase-service-account.json").getInputStream());
    FirebaseOptions firebaseOptions = FirebaseOptions
            .builder()
            .setCredentials(googleCredentials)
            .build();
    Optional<FirebaseApp> existingApp = FirebaseApp.getApps().stream()
            .filter(app -> FirebaseApp.DEFAULT_APP_NAME.equals(app.getName()))
            .findFirst();
    FirebaseApp app;
    if (existingApp.isPresent()) {
        app = existingApp.get();
    }else {
        app = FirebaseApp.initializeApp(firebaseOptions);
    }
    
    return FirebaseMessaging.getInstance(app); 
    }
}
