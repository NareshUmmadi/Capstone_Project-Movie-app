package com.app.service;

import com.app.exception.UserNotFound;
import com.app.model.*;
import com.app.rabbitmq.Producer;
import com.app.repository.TrailerRepository;
import com.app.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
public class AdminServiceTests {
    @Mock
    private UserRepository userRepository;
    @Mock
    private TrailerRepository trailerRepository;
    @Mock
    private Producer producer;
    @InjectMocks
    private AdminService adminService;
    private User user;
    private Movie movie;
    private Subscription subscription;
    private Image image;
    private List<Movie> m1 = new ArrayList<>();
    private List<Movie> m2 = new ArrayList<>();
    private Movie movie1;
    private MultipartFile imgFile;
    private Trailer trailer;
    private Date date;
    private Calendar calendar;

    @BeforeEach
    public void setUp() throws FileNotFoundException {
        trailer=new Trailer("P001","Welcome");
        movie1 = new Movie(null, null, 1, null, null, 1.5, null);
        movie = new Movie(" /qDA95ebiy3W3m8hTRB3xZNZVVBM.jpg", "In 1993, six months after the events of The Silence of the Lambs, FBI Agent Clarice \n" +
                " Starling returns to the field to pursue serial murderers and sexual predators while navigating the \n" +
                " high stakes political world of Washington, D.C.", 145, "18-02-2007", "/7OFxU0bBO0HDL4klXmM1ahJPbv8.jpg", 78d, "hello");
        m1.add(movie);
        m2.add(movie1);
        subscription = null;
        image = new Image("hi", null);
        user = new User("abc@123", "abc",image, subscription, m1, m2, 300d);
        date=new Date();
        calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.MONTH, 1);
    }
    @AfterEach
    public void clear() {
        movie = null;
        movie1 = null;
        m1 = null;
        m2 = null;
        subscription = null;
        image = null;
        user = null;
        imgFile=null;
        trailer=null;
        date=null;
        calendar=null;
    }

    @Test
    public void giveCreditsSuccess() throws UserNotFound {
      when(userRepository.findById("abc@123")).thenReturn(Optional.ofNullable(user));
      when(userRepository.save(user)).thenReturn(user);
      assertEquals(500d,adminService.giveCredits("abc@123",200).getCredits());
        verify(userRepository,times(1)).findById("abc@123");
        verify(userRepository,times(1)).save(user);
    }


    @Test
    public void giveCreditsFailure(){
        when(userRepository.findById("abc@123")).thenReturn(Optional.ofNullable(null));
        assertThrows(UserNotFound.class,()->adminService.giveCredits("abc@123",300));
        verify(userRepository,times(1)).findById("abc@123");
        verify(userRepository,times(0)).save(user);
    }

    @Test
    public void addTrailerSuccess(){
        List<Trailer>tr=new ArrayList<>();
        when(trailerRepository.save(trailer)).thenReturn(trailer);
        when(trailerRepository.findAll()).thenReturn(tr);
        assertEquals(tr,adminService.addTrailer(trailer));
        verify(trailerRepository,times(1)).save(trailer);
        verify(trailerRepository,times(1)).findAll();
    }

    @Test
    public void removeTrailer(){
        List<Trailer>tr=new ArrayList<>();
        doNothing().when(trailerRepository).deleteById(trailer.getKey());
        when(trailerRepository.findAll()).thenReturn(tr);
        assertEquals(tr,adminService.removeTrailer(trailer));
        verify(trailerRepository,times(1)).deleteById(trailer.getKey());
        verify(trailerRepository,times(1)).findAll();
    }

    @Test
    public void activateSubscription() throws UserNotFound {
        when(userRepository.findById("abc@123")).thenReturn(Optional.ofNullable(user));
//        doNothing().when(producer.sendMessageToMessageApp(new Email()));
        adminService.activateSubscription("abc@123", "DIAMOND");
        String type = String.valueOf(user.getSubscription().getType());
        assertEquals("DIAMOND", type);
    }

    @Test
    public void activateSubscription_ThrowException() throws UserNotFound {
        when(userRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(null));
        assertThrows(UserNotFound.class, () -> adminService.activateSubscription(user.getEmail(), "GOLD"));
    }

    @Test
    public void giveFreeSubscription() throws UserNotFound {
        when(userRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(user));
        when(adminService.activateSubscription(user.getEmail(),"GOLD")).thenReturn(user);
        User retUser=adminService.giveFreeSubscription(user.getEmail(), "GOLD");
        String type = String.valueOf(retUser.getSubscription().getType());
        assertEquals("GOLD", type);
    }
    @Test
    public void giveFreeSubscription_ThrowException() throws UserNotFound {
        when(userRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(null));
        assertThrows(UserNotFound.class, () -> adminService.giveFreeSubscription(user.getEmail(), "GOLD"));
    }

}
