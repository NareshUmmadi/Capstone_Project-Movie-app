package com.app.controller;



import com.app.dto.CommonUser;

import com.app.dto.UserDTO;
import com.app.exception.UserNotFound;
import com.app.model.*;

import com.app.service.IUserService;
import com.app.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertThrowsExactly;
import static org.mockito.Mockito.*;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
public class UserControllerTest {
    private MockMvc mockMvc;
    @Mock
    private IUserService userService;
    @InjectMocks
    private UserController userController;
    private User user;
    private Movie movie;
    private Subscription subscription;
    private Image image;
    private List<Movie> m1 = new ArrayList<>();
    private List<Movie> m2 = new ArrayList<>();
    private Movie movie1;
    @Mock
    private MultipartFile imgFile;
    private CommonUser commonUser;
    private UserDTO userDTO;
    MockMultipartFile file;

    @BeforeEach
    public void setUp() {
        userDTO=new UserDTO("12345","Abc@123");
        movie1 = new Movie(null, null, 1, null, null, 1.5, null);
        movie = new Movie(" /qDA95ebiy3W3m8hTRB3xZNZVVBM.jpg", "In 1993, six months after the events of The Silence of the Lambs, FBI Agent Clarice \n" +
                " Starling returns to the field to pursue serial murderers and sexual predators while navigating the \n" +
                " high stakes political world of Washington, D.C.", 145, "18-02-2007", "/7OFxU0bBO0HDL4klXmM1ahJPbv8.jpg", 78d, "hello");

        m1.add(movie);
        m2.add(movie1);

        subscription = new Subscription(SubType.SILVER, null, null);
        image = new Image("hi", null);
        imgFile = null;

        user = new User("abc@123", "abc", image, subscription, m1, m2, 300d);
        User user1 = new User("abcc@123", "abc", image, subscription, m1, m2, 300d);

        commonUser = new CommonUser("abc@123", "abc", "12345");
        commonUser.setProfileImage(image);
        commonUser.setSubscription(subscription);

        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
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
    }
    private static String convertToJson(final Object obj) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(obj);
    }
    @Test
    public void getUserDetailsSuccess() throws Exception {
        when(userService.getUserDetails(user.getEmail())).thenReturn(user);
        mockMvc.perform(get("/user/user/abc@123")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(convertToJson(user)))
                .andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
        assertThat(userService.getUserDetails(user.getEmail())).isNotNull();
        verify(userService, times(2)).getUserDetails(user.getEmail());
    }
    @Test
    public void getUserDetailsFailure() throws Exception {
        when(userService.getUserDetails(user.getEmail())).thenThrow(UserNotFound.class);
        mockMvc.perform(get("/user/user/abc@123")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(convertToJson(user)))
                .andExpect(status().isNotFound()).andDo(MockMvcResultHandlers.print());
        assertThrows(UserNotFound.class, () -> userService.getUserDetails(user.getEmail()));
        verify(userService, times(2)).getUserDetails(user.getEmail());
    }
    @Test
    public void updateSuccess() throws Exception {
        when(userService.editProfile(user)).thenReturn(user);
        mockMvc.perform(MockMvcRequestBuilders.put("/user/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(convertToJson(user)))
                .andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
        assertThat(userService.editProfile(user)).isNotNull();
        verify(userService,times(2)).editProfile(user);
    }
    @Test
    public void updateFailure() throws Exception {
        when(userService.editProfile(user)).thenThrow(UserNotFound.class);
        mockMvc.perform(MockMvcRequestBuilders.put("/user/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(convertToJson(user)))
                .andExpect(status().isNotFound()).andDo(MockMvcResultHandlers.print());
        assertThrowsExactly(UserNotFound.class, () -> userService.editProfile(user));
        verify(userService,times(2)).editProfile(user);
    }

    @Test
    public void DeleteSuccess() throws Exception {
        when(userService.deleteAccount(user.getEmail())).thenReturn("User deleted successfully");
        mockMvc.perform(MockMvcRequestBuilders.delete("/user/user/abc@123")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(convertToJson(user)))
                .andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
        assertThat(userService.deleteAccount(user.getEmail())).isEqualTo("User deleted successfully");
        verify(userService,times(2)).deleteAccount(user.getEmail());
    }

    @Test
    public void DeleteFailure() throws Exception {
        when(userService.deleteAccount(user.getEmail())).thenThrow(UserNotFound.class);
        mockMvc.perform(MockMvcRequestBuilders.delete("/user/user/abc@123")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(convertToJson(user)))
                .andExpect(status().isNotFound()).andDo(MockMvcResultHandlers.print());
        assertThrows(UserNotFound.class, () -> userService.deleteAccount(user.getEmail()));
        verify(userService,times(2)).deleteAccount(user.getEmail());
    }

    @Test
    public void passwordSuccess() throws Exception {
        when(userService.changePassword(userDTO)).thenReturn("Password changed successfully");
        mockMvc.perform(MockMvcRequestBuilders.put("/user/user/details")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(convertToJson(userDTO)))
                .andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
        assertThat(userService.changePassword(userDTO)).isEqualTo("Password changed successfully");
        verify(userService,times(2)).changePassword(userDTO);
    }
}
