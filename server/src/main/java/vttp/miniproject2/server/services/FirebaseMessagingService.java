package vttp.miniproject2.server.services;

import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;

import vttp.miniproject2.server.models.Note;

@Service
public class FirebaseMessagingService {

    @Autowired
    private final FirebaseMessaging firebaseMessaging;

    public FirebaseMessagingService(FirebaseMessaging firebaseMessaging) {
        this.firebaseMessaging = firebaseMessaging;
    }
 

    // public String sendNotification(Note note, String token) throws FirebaseMessagingException {

    //     Notification notification = Notification
    //             .builder()
    //             .setTitle(note.getSubject())
    //             .setBody(note.getContent())
    //             .build();

    //     Message message = Message
    //             .builder()
    //             .setToken(token)
    //             .setNotification(notification)
    //             .putAllData(note.getData())
    //             .build();

    //     return firebaseMessaging.send(message);
    // }

    public String sendMessage(String title, String body, String token) throws FirebaseMessagingException, InterruptedException, ExecutionException  {
        Notification notification = Notification.builder()
                .setTitle(title)
                .setBody(body)
                .build();

        Message message = Message.builder()
                .setNotification(notification)
                .setToken(token)
                .build();

        return firebaseMessaging.sendAsync(message).get();
    }
    // public String sendNotification(Note note, String token) throws FirebaseMessagingException {

    //     Notification notification = Notification
    //             .builder()
    //             .setTitle(note.getSubject())
    //             .setBody(note.getContent())
    //             .build();

    //     Message message = Message
    //             .builder()
    //             .setToken(token)
    //             .setNotification(notification)
    //             .putAllData(note.getData())
    //             .build();

    //     return firebaseMessaging.send(message);
    // }

    
}
