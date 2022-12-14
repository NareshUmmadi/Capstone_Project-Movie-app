package com.app.controller;


import com.app.exception.UserNotFound;
import com.app.model.*;
import com.app.service.AdminService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.assertj.core.api.AssertionsForClassTypes;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;


import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@ExtendWith(SpringExtension.class)
public class AdminControllerTests {
    private MockMvc mockMvc;
    @Mock
    private AdminService adminService;
    @InjectMocks
    private AdminController adminController;
    private Trailer trailer;
    private User user;
    private Movie movie;
    private Image image;
    private byte[] imgData;
    private List<Movie> watchList;
    private List<Movie> favList;
    private Subscription subscription;

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(adminController).build();
        movie = new Movie();
        trailer = new Trailer("trailerKey", "trailerTitle");
        image = new Image("profile", imgData);
        subscription = new Subscription(SubType.SILVER, new Date(), new Date());
        watchList = new ArrayList<>();
        watchList.add(movie);
        favList = new ArrayList<>();
        favList.add(movie);
        user = new User("xyz@gmail.com", "name", image, subscription, watchList, favList, 500d);
    }

    @AfterEach
    public void clear() {
        trailer=null;
    }

    public static String mapToJson(final Object obj) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(obj);
    }

    public static <T> T mapFromJson(String json, Class<T> clazz) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(json, clazz);
    }

    @Test
    public void addTrailer() throws Exception {
        when(adminService.addTrailer(trailer)).thenReturn(List.of(trailer));
        MvcResult mvcResult = mockMvc.perform(post("/admin/admin/trailer")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapToJson(trailer)))
                .andExpect(status().isCreated()).andDo(MockMvcResultHandlers.print())
                .andReturn();
        String content = mvcResult.getResponse().getContentAsString();
        assertThat(mapFromJson(content, Trailer[].class).length).isEqualTo(1);
        verify(adminService,times(1)).addTrailer(trailer);
    }

    @Test
    public void deleteTrailer() throws Exception {
        List<Trailer> t1=new ArrayList<>();
        when(adminService.removeTrailer(trailer)).thenReturn(List.of(trailer));
        MvcResult mvcResult =  mockMvc.perform(delete("/admin/admin/trailer")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapToJson(trailer)))
                .andExpect(status().isOk()).andDo(MockMvcResultHandlers.print()).andReturn();
        String content = mvcResult.getResponse().getContentAsString();
        assertEquals(mapFromJson(content, Trailer[].class).length, 1);
        verify(adminService,times(1)).removeTrailer(trailer);
    }
    @Test
    public void giveCredits() throws Exception {
        when(adminService.giveCredits(user.getEmail(), 500d)).thenReturn(user);
        MvcResult mvcResult = mockMvc.perform(put("/admin/admin/credits/xyz@gmail.com/500")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapToJson(user)))
                .andExpect(status().isOk()).andDo(MockMvcResultHandlers.print())
                .andReturn();
        String content = mvcResult.getResponse().getContentAsString();
        assertThat(mapFromJson(content, User.class).getCredits()).isEqualTo(500d);
    }

    @Test
    public void giveCredits_ThrowException() throws Exception {
        when(adminService.giveCredits(user.getEmail(), 500d)).thenThrow(UserNotFound.class);
        MvcResult mvcResult = mockMvc.perform(put("/admin/admin/credits/xyz@gmail.com/500")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapToJson(user)))
                .andExpect(status().isNotFound()).andDo(MockMvcResultHandlers.print())
                .andReturn();
        assertThrows(UserNotFound.class, () -> adminService.giveCredits(user.getEmail(), 500d));
    }

    @Test
    public void giveFreeSubs() throws Exception {
        when(adminService.giveFreeSubscription(user.getEmail(), "GOLD")).thenReturn(user);
        MvcResult mvcResult = mockMvc.perform(post("/admin/admin/free-subs/xyz@gmail.com/GOLD")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapToJson(user)))
                .andExpect(status().isOk()).andDo(MockMvcResultHandlers.print())
                .andReturn();
        String content = mvcResult.getResponse().getContentAsString();
        SubType type = mapFromJson(content, User.class).getSubscription().getType();
        assertThat(type).isEqualTo(user.getSubscription().getType());
    }

    @Test
    public void giveFreeSubs_ThrowException() throws Exception {
        when(adminService.giveFreeSubscription(user.getEmail(), "GOLD")).thenThrow(UserNotFound.class);
        MvcResult mvcResult = mockMvc.perform(post("/admin/admin/free-subs/xyz@gmail.com/GOLD")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapToJson(user)))
                .andExpect(status().isNotFound()).andDo(MockMvcResultHandlers.print())
                .andReturn();
        assertThrows(UserNotFound.class, () -> adminService.giveFreeSubscription(user.getEmail(), "GOLD"));
    }

    @Test
    public void activateSubscription() throws Exception {
        when(adminService.activateSubscription(user.getEmail(), "SILVER")).thenReturn(user);
        MvcResult mvcResult = mockMvc.perform(post("/admin/user/subscribe/xyz@gmail.com/SILVER")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(mapToJson(user)))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print()).andReturn();
        String result = mvcResult.getResponse().getContentAsString();
        assertEquals(mapFromJson(result, User.class).getSubscription().getType(), user.getSubscription().getType());
        verify(adminService,times(1)).activateSubscription(user.getEmail(),"SILVER");
    }

    @Test
    public void activateSubs_ThrowException() throws Exception {
        when(adminService.activateSubscription(user.getEmail(), "SILVER")).thenReturn(user);
        MvcResult mvcResult = mockMvc.perform(post("/admin/user/subscribe/xyz@gmail.com/SILVER")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(mapToJson(user)))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print()).andReturn();
        String result = mvcResult.getResponse().getContentAsString();
        assertEquals(mapFromJson(result, User.class).getSubscription().getType(), user.getSubscription().getType());
        verify(adminService,times(1)).activateSubscription(user.getEmail(),"SILVER");
    }

}
