package com.app.service;

import com.app.exception.UserNotFound;
import com.app.model.*;
import com.app.rabbitmq.Producer;
import com.app.repository.TrailerRepository;
import com.app.repository.UserRepository;
import com.netflix.discovery.converters.Auto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class AdminService implements IAdminService{

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TrailerRepository trailerRepository;
    @Autowired
    Producer producer;

//    boolean transaction=true;

    @Override
    public User giveCredits(String email, double credits) throws UserNotFound {
        User user = userRepository.findById(email).orElseThrow(UserNotFound::new);
        user.setCredits(user.getCredits()+credits);

        List<Transaction> purchaseHistory = user.getPurchaseHistory();
        Transaction transaction = new Transaction(new Date(), "Gift credits", "Credit", credits);
        purchaseHistory.add(transaction);
        user.setPurchaseHistory(purchaseHistory);

        Email sendEmail = new Email();
        sendEmail.setRecipient(user.getEmail());
        sendEmail.setSubject("Give Credits");
        sendEmail.setMsgBody("Your Credits Are Added");
        sendEmail.setAttachment("Empty");
        producer.sendMessageToMessageApp(sendEmail);

        userRepository.save(user);
        return user;
    }

    @Override
    public User giveFreeSubscription(String email, String type) throws UserNotFound {
        User user = activateSubscription(email, type);
        if(type.equalsIgnoreCase(String.valueOf(SubType.SILVER))){
            user.setCredits(user.getCredits() + 100d);
        }
        else if(type.equalsIgnoreCase(String.valueOf(SubType.GOLD))){
            user.setCredits(user.getCredits() + 300d);
        }
        else{
            user.setCredits(user.getCredits() + 500d);
        }

        List<Transaction> purchaseHistory = user.getPurchaseHistory();
        Transaction transaction = new Transaction(new Date(), type.toUpperCase()+" Subscription", "Credit", 0.0d);
        purchaseHistory.remove(purchaseHistory.size()-1);
        purchaseHistory.add(transaction);
        user.setPurchaseHistory(purchaseHistory);

        Email sendEmail = new Email();
        sendEmail.setRecipient(user.getEmail());
        sendEmail.setSubject("Free Subscription");
        sendEmail.setMsgBody("Your Free Subscription Is Added");
        sendEmail.setAttachment("Empty");
        producer.sendMessageToMessageApp(sendEmail);

        return userRepository.save(user);
    }

    @Override
    public User activateSubscription(String email, String type) throws UserNotFound {
        User user = userRepository.findById(email).orElseThrow(UserNotFound::new);
        Date currentDate = new Date();
        Calendar cal = Calendar.getInstance();
        List<Transaction> purchaseHistory = user.getPurchaseHistory();
        Email sendEmail = new Email();

        //For SILVER
        if (type.equalsIgnoreCase(String.valueOf(SubType.SILVER))){
            Transaction transaction = new Transaction(currentDate, type.toUpperCase()+" Subscription", "Debit", 100d);
            purchaseHistory.add(transaction);
            user.setPurchaseHistory(purchaseHistory);

            sendEmail.setRecipient(user.getEmail());
            sendEmail.setSubject("Subscription");
            sendEmail.setMsgBody("Your "+type.toUpperCase()+" Subscription Is Activated");
            sendEmail.setAttachment("Empty");
            producer.sendMessageToMessageApp(sendEmail);

            Subscription subscription = new Subscription(SubType.SILVER, currentDate, getSilver());
            if (user.getSubscription()==null|| user.getSubscription().getType() == null || user.getSubscription().getDeactivationDate().before(currentDate)){
                user.setSubscription(subscription);
                user.setCredits(user.getCredits() - 100d);
                return userRepository.save(user);
            }
            Date oldSub = user.getSubscription().getDeactivationDate();
            cal.setTime(oldSub);
            cal.add(Calendar.MONTH, 1);
            subscription = new Subscription(SubType.SILVER, currentDate, cal.getTime());
            user.setSubscription(subscription);
            user.setCredits(user.getCredits() - 100d);
            return userRepository.save(user);
        }
        // For GOLD
        else if(type.equalsIgnoreCase(String.valueOf(SubType.GOLD))){
            Transaction transaction = new Transaction(currentDate, type.toUpperCase()+" Subscription", "Debit", 300d);
            purchaseHistory.add(transaction);
            user.setPurchaseHistory(purchaseHistory);

            sendEmail.setRecipient(user.getEmail());
            sendEmail.setSubject("Subscription");
            sendEmail.setMsgBody("Your "+type.toUpperCase()+" Subscription Is Activated");
            sendEmail.setAttachment("Empty");
            producer.sendMessageToMessageApp(sendEmail);

            Subscription subscription = new Subscription(SubType.GOLD, currentDate, getGold());
            if (user.getSubscription()==null||user.getSubscription().getType() == null || user.getSubscription().getDeactivationDate().before(currentDate)){
                user.setSubscription(subscription);
                user.setCredits(user.getCredits() - 300d);
                return userRepository.save(user);
            }
            Date oldSub = user.getSubscription().getDeactivationDate();
            cal.setTime(oldSub);
            cal.add(Calendar.MONTH, 6);
            subscription = new Subscription(SubType.GOLD, currentDate, cal.getTime());
            user.setSubscription(subscription);
            user.setCredits(user.getCredits() - 300d);
            return userRepository.save(user);
        }
        // For DIAMOND
        else{
            Transaction transaction = new Transaction(currentDate, type.toUpperCase()+" Subscription", "Debit", 500d);
            purchaseHistory.add(transaction);
            user.setPurchaseHistory(purchaseHistory);

            sendEmail.setRecipient(user.getEmail());
            sendEmail.setSubject("Subscription");
            sendEmail.setMsgBody("Your "+type.toUpperCase()+" Subscription Is Activated");
            sendEmail.setAttachment("Empty");
            producer.sendMessageToMessageApp(sendEmail);

            Subscription subscription = new Subscription(SubType.DIAMOND, currentDate, getDiamond());
            if (user.getSubscription()==null|| user.getSubscription().getType() == null || user.getSubscription().getDeactivationDate().before(currentDate)){
                user.setSubscription(subscription);
                user.setCredits(user.getCredits() - 500d);
                return userRepository.save(user);
            }
            Date oldSub = user.getSubscription().getDeactivationDate();
            cal.setTime(oldSub);
            cal.add(Calendar.YEAR, 1);
            subscription = new Subscription(SubType.DIAMOND, currentDate, cal.getTime());
            user.setSubscription(subscription);
            user.setCredits(user.getCredits() - 500d);
            return userRepository.save(user);
        }
    }
    @Override
    public List<Trailer> addTrailer(Trailer trailer) {
        trailerRepository.save(trailer);
        return trailerRepository.findAll();
    }
    @Override
    public List<Trailer> removeTrailer(Trailer trailer) {
        trailerRepository.deleteById(trailer.getKey());
        return trailerRepository.findAll();
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Date getSilver(){
        Date currentDate = new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(currentDate);
        cal.add(Calendar.MONTH, 1);
        return cal.getTime();
    }
    public Date getGold(){
        Date currentDate = new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(currentDate);
        cal.add(Calendar.MONTH, 6);
        return cal.getTime();
    }
    public Date getDiamond(){
        Date currentDate = new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(currentDate);
        cal.add(Calendar.YEAR, 1);
        return cal.getTime();
    }
}
