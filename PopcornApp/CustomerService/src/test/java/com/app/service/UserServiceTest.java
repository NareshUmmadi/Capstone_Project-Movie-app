package com.app.service;


import com.app.dto.CommonUser;
import com.app.dto.UserDTO;
import com.app.exception.UserNotFound;
import com.app.model.*;
import com.app.rabbitmq.ProducerUserAuth;
import com.app.repository.UserRepository;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;


import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    @Mock
    private UserRepository userRepository;
    @Mock
    private ProducerUserAuth producer;
    @InjectMocks
    private UserService userService;
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
    public void setUp() throws FileNotFoundException {
        userDTO = new UserDTO("12345", "Abc@123");
        movie1 = new Movie(null, null, 1, null, null, 1.5, null);
        movie = new Movie(" /qDA95ebiy3W3m8hTRB3xZNZVVBM.jpg", "In 1993, six months after the events of The Silence of the Lambs, FBI Agent Clarice \n" +
                " Starling returns to the field to pursue serial murderers and sexual predators while navigating the \n" +
                " high stakes political world of Washington, D.C.", 145, "18-02-2007", "/7OFxU0bBO0HDL4klXmM1ahJPbv8.jpg", 78d, "hello");
        m1.add(movie);
        m2.add(movie1);
        subscription = new Subscription(SubType.SILVER, null, null);
        image = new Image("hi", null);
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
    public void userEditProfileSuccess() throws UserNotFound {
        when(userRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(user));
        when(userRepository.save(user)).thenReturn(user);
        assertEquals(user,userService.editProfile(user));
        verify(userRepository,times(1)).findById(user.getEmail());
        verify(userRepository,times(1)).save(user);
    }
    @Test
    public void userEditProfileFails() throws UserNotFound {
        when(userRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(null));
        assertThrows(UserNotFound.class,()->userService.editProfile(user));
        verify(userRepository,times(1)).findById(user.getEmail());
        verify(userRepository,times(0)).save(user);
    }
    @Test
    public void getUserDetailsSuccess() throws UserNotFound {
        when(userRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(user));
        assertEquals(user,userService.getUserDetails(user.getEmail()));
        verify(userRepository,times(1)).findById(user.getEmail());
    }
    @Test
    public void getUserDetailsFailure() throws UserNotFound {
        when(userRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(null));
        assertThrows(UserNotFound.class,()->userService.getUserDetails(user.getEmail()));
        verify(userRepository,times(1)).findById(user.getEmail());

    }
    @Test
    public void deleteUserSuccess() throws UserNotFound {
        when(userRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(user));
        doNothing().when(userRepository).deleteById(user.getEmail());
        assertEquals("User deleted successfully",userService.deleteAccount(user.getEmail()));
        verify(userRepository,times(1)).findById(user.getEmail());
        verify(userRepository,times(1)).deleteById(user.getEmail());
    }
    @Test
    public void deleteUserFailure() throws UserNotFound {
        when(userRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(null));
        assertThrows(UserNotFound.class,()->userService.deleteAccount(user.getEmail()));
        verify(userRepository,times(1)).findById(user.getEmail());
        verify(userRepository,times(0)).deleteById(user.getEmail());
    }
    @Test
    public void changePassword(){
        doNothing().when(producer).changeUserPassword(userDTO);
        assertEquals("Password changed successfully",userService.changePassword(userDTO));
        verify(producer,times(1)).changeUserPassword(userDTO);
    }
    @Test
    public void changePasswordTest(){
       doNothing().when(producer).changeUserPassword(userDTO);
       assertEquals("Password changed successfully",userService.changePassword(userDTO));
       verify(producer,times(1)).changeUserPassword(userDTO);
    }
}