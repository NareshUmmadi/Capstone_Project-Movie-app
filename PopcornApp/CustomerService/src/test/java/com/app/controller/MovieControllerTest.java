package com.app.controller;

import com.app.exception.UserNotFound;
import com.app.model.*;
import com.app.service.IMovieService;
import com.app.service.MovieService;
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
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@ExtendWith(SpringExtension.class)
public class MovieControllerTest {

    private MockMvc mockMvc;
    @Mock
    private IMovieService movieService;
    @InjectMocks
    private MovieController movieController;
    private User user;
    private Trailer trailer;
    private Movie movie;
    private Transaction transaction;
    private List<Transaction> transactionList;
    private Image image;
    private byte[] imgData;
    private List<Movie> watchList;
    private List<Movie> favList;
    private Subscription subscription;
   private Movie newMovie= new Movie();

   @BeforeEach
   public void setup(){
       mockMvc = MockMvcBuilders.standaloneSetup(movieController).build();
       movie = new Movie();
       transaction = new Transaction();
       trailer = new Trailer("trailerKey", "trailerTitle");
       image = new Image("profile", imgData);
       subscription = new Subscription(SubType.SILVER, new Date(), new Date());
       watchList = new ArrayList<>();
       favList = new ArrayList<>();
       transactionList = new ArrayList<>();
       transactionList.add(transaction);
       watchList.add(movie);
       favList.add(movie);
       user = new User("xyz@gmail.com", "name", image, subscription, watchList, favList, 0.0);
//       user = new User("xyz@gmail.com", "name", image, subscription, watchList, favList, 0.0, new Date(), transactionList);
   }

   @AfterEach
   public void clear(){
       movie = null;
       trailer = null;
       image = null;
       subscription = null;
       user = null;
       favList = null;
       watchList = null;
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
   public void getTrailers() throws Exception {
       when(movieService.getAllTrailers()).thenReturn(List.of(trailer));
       MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.get("/user/trailers")
               .accept(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk())
               .andDo(MockMvcResultHandlers.print()).andReturn();
       String content = mvcResult.getResponse().getContentAsString();
       assertThat(mapFromJson(content, Trailer[].class).length).isEqualTo(1);
   }
   @Test
   public void addMovieInWatchList() throws Exception {
        when(movieService.addMovieToWatchlist(user.getEmail(), movie)).thenReturn(user);
        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/user/user/watchlist/xyz@gmail.com")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(mapToJson(user)))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
        String content = mvcResult.getResponse().getContentAsString();
        assertEquals(mapFromJson(content, User.class).getWatchlist(), user.getWatchlist());
        verify(movieService, times(1)).addMovieToWatchlist(user.getEmail(),newMovie);
   }

    @Test
    public void addMovieInWatchList_throwException() throws Exception {
        when(movieService.addMovieToWatchlist(user.getEmail(), movie)).thenThrow(UserNotFound.class);
        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/user/user/watchlist/xyz@gmail.com")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(mapToJson(user)))
                .andExpect(status().isNotFound())
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
        assertThrows(UserNotFound.class, () -> movieService.addMovieToWatchlist(user.getEmail(), movie));
    }

    @Test
   public void addFavouriteListSuccess() throws Exception {
        when(movieService.addMovieToFavourites(user.getEmail(),movie)).thenReturn(user);
        MvcResult mvcResult = mockMvc.perform(post("/user/user/favourite/xyz@gmail.com")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(mapToJson(user)))
                .andExpect(status().isOk()).andDo(MockMvcResultHandlers.print()).andReturn();
        String content = mvcResult.getResponse().getContentAsString();
        assertEquals(mapFromJson(content, User.class).getWatchlist(), user.getFavourites());
        verify(movieService, times(1)).addMovieToFavourites(user.getEmail(),newMovie);
   }

    @Test
    public void addFavouriteListFailure() throws Exception {
        when(movieService.addMovieToFavourites(user.getEmail(),movie)).thenThrow(UserNotFound.class);
        mockMvc.perform(post("/user/user/favourite/xyz@gmail.com")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapToJson(user)))
                .andExpect(status().isNotFound()).andDo(MockMvcResultHandlers.print());
        assertThrows(UserNotFound.class, () -> movieService.addMovieToFavourites(user.getEmail(), movie));
        verify(movieService, times(2)).addMovieToFavourites(user.getEmail(),newMovie);
    }

    @Test
    public void deleteMovieFromFavoriteListSuccess() throws Exception {
        when(movieService.removeMovieFromFavourites("xyz@gmail.com",newMovie)).thenReturn(user);
        MvcResult mvcResult =  mockMvc.perform(delete("/user/user/favourite/xyz@gmail.com")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(mapToJson(user)))
                .andExpect(status().isOk()).andDo(MockMvcResultHandlers.print()).andReturn();
        String content = mvcResult.getResponse().getContentAsString();
        assertEquals(mapFromJson(content, User.class).getFavourites(), user.getFavourites());
        verify(movieService,times(1)).removeMovieFromFavourites("xyz@gmail.com",newMovie);
    }
    @Test
    public void deleteMovieFromFavoriteListFailure() throws Exception {
        when(movieService.removeMovieFromFavourites("xyz@gmail.com",newMovie)).thenThrow(UserNotFound.class);
        mockMvc.perform(delete("/user/favourite/xyz@gmail.com")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(mapToJson(user)))
                .andExpect(status().isNotFound()).andDo(MockMvcResultHandlers.print());
        assertThrows(UserNotFound.class, () -> movieService.removeMovieFromFavourites("xyz@gmail.com", movie));
        verify(movieService,times(1)).removeMovieFromFavourites("xyz@gmail.com", newMovie);
    }

    @Test
    public void deleteMovieWatchListSuccess() throws Exception {
        when(movieService.removeMovieFromWatchList("xyz@gmail.com",movie)).thenReturn(user);
        MvcResult mvcResult =  mockMvc.perform(MockMvcRequestBuilders.delete("/user/user/watchlist/xyz@gmail.com")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(mapToJson(user)))
                .andExpect(status().isOk()).andDo(MockMvcResultHandlers.print()).andReturn();
        String content = mvcResult.getResponse().getContentAsString();
        assertEquals(mapFromJson(content, User.class).getWatchlist(), user.getWatchlist());
        verify(movieService,times(1)).removeMovieFromWatchList("xyz@gmail.com",movie);
    }

    @Test
    public void deleteMovieWatchListFailure() throws Exception {
        when(movieService.removeMovieFromWatchList("abc@123",movie)).thenThrow(UserNotFound.class);
        mockMvc.perform(MockMvcRequestBuilders.delete("/user/user/watchlist/abc@123")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(mapToJson(user)))
                .andExpect(status().isNotFound()).andDo(MockMvcResultHandlers.print());
        assertThrows(UserNotFound.class, () -> movieService.removeMovieFromWatchList("abc@123", movie));
        verify(movieService,times(2)).removeMovieFromWatchList("abc@123",movie);
    }
}
