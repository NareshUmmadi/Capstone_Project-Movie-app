package com.app.controller;


import com.app.JwtTokenGenerator.ITokenGenerator;
import com.app.JwtTokenGenerator.TokenGenerator;
import com.app.exception.InvalidCredentialsException;
import com.app.exception.UserNotFoundException;
import com.app.model.User;
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
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.stubbing.Answer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Mock
    private IUserService userService;
    @InjectMocks
    private UserController userController;
    @Mock
    private ITokenGenerator tokenGenerator;

    Map<String, String> jwtToken;
    private User user;
    private User user2;

    @BeforeEach
    public void setup(){
        user = new User("xyz@gmail.com", "pass123", "user", false);
        user2 = new User("xyz@gmail.com", "pass123", "user", true);
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @AfterEach
    public void clear(){
        user = null;
        user2 = null;
    }

    public static String mapToJson(final Object obj) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(obj);
    }

    public static <T> T mapFromJson(String json, Class<T> clazz) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(json, clazz);
    }

    @Test
    public void checkLogin() throws Exception {
        jwtToken = new HashMap<>();
        jwtToken.put("token", "fake token");
        when(userService.login(user)).thenReturn(jwtToken);
        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/auth/login")
                 .contentType(MediaType.APPLICATION_JSON_VALUE)
                 .content(mapToJson(user)))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
        String content = mvcResult.getResponse().getContentAsString();
        assertNotNull(content);
        verify(userService,times(1)).login(user);
    }

    @Test
    public void checkLogin_ThrowException_notFound() throws Exception {
        when(userService.login(user)).thenThrow(UserNotFoundException.class);
        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(mapToJson(user)))
                .andExpect(status().isNotFound())
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
        assertThrows(UserNotFoundException.class, () -> userService.login(user));
    }

    @Test
    public void checkLogin_ThrowException_InvalidCredentials() throws Exception {
        when(userService.login(user)).thenThrow(InvalidCredentialsException.class);
        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(mapToJson(user)))
                .andExpect(status().isUnauthorized())
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
        assertThrows(InvalidCredentialsException.class, () -> userService.login(user));
    }

    @Test
    public void activateAccount() throws Exception {
        when(userService.activateAccount(user.getEmail())).thenReturn(user2);
        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/auth/user/verify/xyz@gmail.com")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(mapToJson(user)))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
        String result = mvcResult.getResponse().getContentAsString();
        assertEquals(true, user2.getIsVerified());
        verify(userService,times(1)).activateAccount("xyz@gmail.com");
    }

    @Test
    public void activateAccount_throwException() throws Exception {
        when(userService.activateAccount(user.getEmail())).thenThrow(UserNotFoundException.class);
        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/auth/user/verify/xyz@gmail.com")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(mapToJson(user)))
                .andExpect(status().isNotFound())
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
        String result = mvcResult.getResponse().getContentAsString();
        assertThrows(UserNotFoundException.class , () -> userService.activateAccount(user.getEmail()));
    }

    @Test
    public void forgotPass() throws Exception {
        when(userService.forgotPassword(user.getEmail())).thenReturn(user);
        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/auth/user/forgot/xyz@gmail.com")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(mapToJson(user)))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
        String result = mvcResult.getResponse().getContentAsString();
        assertEquals(mapFromJson(result, User.class), user);
        verify(userService,times(1)).forgotPassword("xyz@gmail.com");
    }

    @Test
    public void forgotPass_throwException() throws Exception {
        when(userService.forgotPassword(user.getEmail())).thenThrow(UserNotFoundException.class);
        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/auth/user/forgot/xyz@gmail.com")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(mapToJson(user)))
                .andExpect(status().isNotFound())
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
        assertThrows(UserNotFoundException.class, () -> userService.forgotPassword(user.getEmail()));
    }

    @Test
    public void verifyPassword() throws Exception {
        when(userService.verifyPassword(user)).thenReturn(user);
        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/auth/user/verify")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(mapToJson(user)))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
        String result = mvcResult.getResponse().getContentAsString();
        assertEquals(mapFromJson(result, User.class).getIsVerified(), user.getIsVerified());
        verify(userService,times(1)).verifyPassword(user);
    }

    @Test
    public void verifyPassword_throwException() throws Exception {
        when(userService.verifyPassword(user)).thenThrow(UserNotFoundException.class);
        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/auth/user/verify")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(mapToJson(user)))
                .andExpect(status().isNotFound())
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
        String result = mvcResult.getResponse().getContentAsString();
        assertThrows(UserNotFoundException.class, () -> userService.verifyPassword(user));
    }
}
