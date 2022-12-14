package com.app.service;


import com.app.dto.CommonUser;
import com.app.dto.UserDTO;
import com.app.exception.UserNotFound;
import com.app.model.*;
import com.app.rabbitmq.ProducerUserAuth;
import com.app.repository.TrailerRepository;
import com.app.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class MovieServiceTest {
    @Mock
    private UserRepository userRepository;
    @Mock
    private TrailerRepository trailerRepository;
    @Mock
    private ProducerUserAuth producer;
    @InjectMocks
    private MovieService movieService;
    private User user;
    private Movie movie;
    private Subscription subscription;
    private Image image;
    private List<Movie> m1 = new ArrayList<>();
    private List<Movie> m2 = new ArrayList<>();
    private Movie movie1;
    private MultipartFile imgFile;
    private CommonUser commonUser;
    private UserDTO userDTO;
    @BeforeEach
    public void setUp() throws IOException {
        userDTO = new UserDTO("12345", "Abc@123");
        movie1 = new Movie(null, null, 1, null, null, 1.5, null);
        movie = new Movie(" /qDA95ebiy3W3m8hTRB3xZNZVVBM.jpg", "In 1993, six months after the events of The Silence of the Lambs, FBI Agent Clarice \n" +
                " Starling returns to the field to pursue serial murderers and sexual predators while navigating the \n" +
                " high stakes political world of Washington, D.C.", 145, "18-02-2007", "/7OFxU0bBO0HDL4klXmM1ahJPbv8.jpg", 78d, "hello");
        m1.add(movie);

        m2.add(movie1);
        subscription = new Subscription(SubType.SILVER, null, null);
        image = new Image("hi", null);
       imgFile = new MockMultipartFile("hi", (InputStream) null);

        user = new User("abc@123", "abc",image, subscription, m1, m2, 300d);

        commonUser = new CommonUser("abc@123", "abc", "12345");
        commonUser.setProfileImage(image);
        commonUser.setSubscription(subscription);
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
        commonUser = null;
        imgFile=null;
    }
    @Test
    public void addMoviesToWatchlistSuccess() throws UserNotFound {
        when(userRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(user));
        when(userRepository.save(user)).thenReturn(user);
        assertEquals(user,movieService.addMovieToWatchlist(user.getEmail(),movie));
        verify(userRepository,times(1)).findById(user.getEmail());
        verify(userRepository,times(1)).save(user);
    }
    @Test
    public void addMoviesToWatchlistFailure() {
        when(userRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(null));
        assertThrows(UserNotFound.class,()->movieService.addMovieToWatchlist(user.getEmail(),movie));
        verify(userRepository,times(1)).findById(user.getEmail());
        verify(userRepository,times(0)).save(user);

    }
    @Test
    public void addMoviesToFavouratelistSuccess() throws UserNotFound {
        when(userRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(user));
        when(userRepository.save(user)).thenReturn(user);
        assertEquals(user,movieService.addMovieToFavourites(user.getEmail(),movie));
        verify(userRepository,times(1)).findById(user.getEmail());
        verify(userRepository,times(1)).save(user);
    }
    @Test
    public void addMoviesToFavouritelistFailure() throws UserNotFound {
        when(userRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(null));
        assertThrows(UserNotFound.class,()->movieService.addMovieToFavourites(user.getEmail(), movie));
        verify(userRepository,times(1)).findById(user.getEmail());
        verify(userRepository,times(0)).save(user);
    }
    @Test
    public void removeMovieFromWatchListSuccess() throws UserNotFound {
        when(userRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(user));
        when(userRepository.save(user)).thenReturn(user);
        assertEquals(user,movieService.removeMovieFromWatchList(user.getEmail(),movie));
        verify(userRepository,times(1)).findById(user.getEmail());
        verify(userRepository,times(1)).save(user);
    }
    @Test
    public void removeMovieFromWatchListFailure(){
        when(userRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(null));
        assertThrows(UserNotFound.class,()->movieService.removeMovieFromWatchList(user.getEmail(),movie));
        verify(userRepository,times(1)).findById(user.getEmail());
        verify(userRepository,times(0)).save(user);
    }
    @Test
    public void removeMovieFromFavouriteListSuccess() throws UserNotFound {
        when(userRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(user));
        when(userRepository.save(user)).thenReturn(user);
        assertEquals(user,movieService.removeMovieFromFavourites(user.getEmail(),movie));
        verify(userRepository,times(1)).findById(user.getEmail());
        verify(userRepository,times(1)).save(user);

    }
    @Test
    public void removeMovieFromFavoriteListFailure(){
        when(userRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(null));
        assertThrows(UserNotFound.class,()->movieService.removeMovieFromFavourites(user.getEmail(),movie));
        verify(userRepository,times(1)).findById(user.getEmail());
        verify(userRepository,times(0)).save(user);

    }
    @Test
    public void getTrailers(){
         List<Trailer> t =new ArrayList<>();
         when(trailerRepository.findAll()).thenReturn(t);
         assertEquals(t,movieService.getAllTrailers());
         verify(trailerRepository,times(1)).findAll();
    }
}
