package com.app.service;


import com.app.JwtTokenGenerator.TokenGenerator;
import com.app.exception.InvalidCredentialsException;
import com.app.exception.UserAlreadyExistException;
import com.app.exception.UserNotFoundException;
import com.app.model.User;
import com.app.rabbitmq.Producer;
import com.app.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.net.MalformedURLException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;



@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private Producer producer;
    @InjectMocks
    private UserService userService;
    @Mock
    private TokenGenerator tokenGenerator;
    private User user;
    @BeforeEach
    public void init(){
        user=new User("abc@123","12345","USER",false);
    }
    @AfterEach
    public void clean(){
        user=null;
    }

    @Test
    public void registerUserSuccess() throws UserAlreadyExistException, MalformedURLException {
        when(userRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(null));
        when(userRepository.save(user)).thenReturn(user);
        assertEquals(user,userService.registerUser(user));
        verify(userRepository,times(1)).findById(user.getEmail());
        verify(userRepository,times(1)).save(user);

    }
    @Test
    public void registerUserFailure() throws UserAlreadyExistException {
        when(userRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(user));
        assertThrows(UserAlreadyExistException.class,()->userService.registerUser(user));
        verify(userRepository,times(1)).findById(user.getEmail());
        verify(userRepository,times(0)).save(user);
    }

    @Test
    public void loginSuccess() throws UserNotFoundException, InvalidCredentialsException {
        Map<String,String> map1=new HashMap<>();
        map1.put("token", "fake token");
        when(userRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(user));
        when(tokenGenerator.generate_Token(user)).thenReturn(map1);
        assertEquals(map1, userService.login(user));
    }

    @Test
    public void login_ThrowException_NotFound(){
        when(userRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(null));
        assertThrows(UserNotFoundException.class, () -> userService.login(user));
        verify(userRepository,times(1)).findById(user.getEmail());
    }

    @Test
    public void deleteSuccess() throws UserNotFoundException {
        when(userRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(user));
        doNothing().when(userRepository).deleteById(user.getEmail());
        boolean result=userService.deleteAccount(user.getEmail());
        assertEquals(true,result);
        verify(userRepository,times(1)).findById(user.getEmail());
        verify(userRepository,times(1)).deleteById(user.getEmail());
    }

    @Test
    public void deleteFails() throws UserNotFoundException {
        when(userRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(null));
        assertThrows(UserNotFoundException.class,()->userService.deleteAccount(user.getEmail()));
        verify(userRepository,times(1)).findById(user.getEmail());
        verify(userRepository,times(0)).deleteById(user.getEmail());
    }
    @Test
    public void verificationSuccess() throws UserNotFoundException, InvalidCredentialsException {
        when(userRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(user));
        assertEquals(user,userService.verifyPassword(user));
        verify(userRepository,times(1)).findById(user.getEmail());
    }

    @Test
    public void verificationFails(){
        when(userRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(null));
        assertThrows(UserNotFoundException.class,()->userService.verifyPassword(user));
        verify(userRepository,times(1)).findById(user.getEmail());

    }
    @Test
    public void changePasswordSuccess() throws UserNotFoundException {
        when(userRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(user));
        when(userRepository.save(user)).thenReturn(user);
        assertEquals(user,userService.changePassword(user));
        verify(userRepository,times(1)).findById(user.getEmail());
        verify(userRepository,times(1)).save(user);

    }
    @Test
    public void changePasswordFailure() throws UserNotFoundException {
        when(userRepository.findById(user.getEmail())).thenReturn(Optional.ofNullable(null));
        assertThrows(UserNotFoundException.class,()->userService.changePassword(user));
        verify(userRepository,times(1)).findById(user.getEmail());
        verify(userRepository,times(0)).save(user);

    }
    @Test
    public void activateAccountSuccess() throws UserNotFoundException {
        when(userRepository.findById("abc@123")).thenReturn(Optional.ofNullable(user));
        when(userRepository.save(user)).thenReturn(user);
        assertEquals(user,userService.activateAccount("abc@123"));
        assertEquals(true,user.getIsVerified());
        verify(userRepository,times(1)).findById("abc@123");
        verify(userRepository,times(1)).save(user);
    }
    @Test
    public void activateAccountFailure() throws UserNotFoundException {
        when(userRepository.findById("abc@123")).thenReturn(Optional.ofNullable(null));
        assertThrows(UserNotFoundException.class,()->userService.activateAccount("abc@123"));
        verify(userRepository,times(1)).findById("abc@123");
        verify(userRepository,times(0)).save(user);

    }
    @Test
    public void forgetPasswordSuccess() throws UserNotFoundException {
        when(userRepository.findById("abc@123")).thenReturn(Optional.ofNullable(user));
        assertEquals(user,userService.forgotPassword("abc@123"));
        verify(userRepository,times(1)).findById("abc@123");
    }
    @Test
    public void forgetPasswordFailure() throws UserNotFoundException {
        when(userRepository.findById("abc@123")).thenReturn(Optional.ofNullable(null));
        assertThrows(UserNotFoundException.class,()->userService.forgotPassword("abc@123"));
        verify(userRepository,times(1)).findById("abc@123");
    }












}
