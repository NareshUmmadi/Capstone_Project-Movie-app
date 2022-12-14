package com.app.repository;

import com.app.model.Trailer;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(SpringExtension.class)
@DataMongoTest
public class TrailerRepositoryTest {

    @Autowired
    private TrailerRepository trailerRepository;
    private Trailer trailer;

    @BeforeEach
    public void setup(){
        trailer = new Trailer("key", "title");
    }

    @AfterEach
    public void clear(){
        trailer = null;
        trailerRepository.deleteAll();
    }

    @Test
    public void insertTrailer(){
        trailerRepository.insert(trailer);
        assertEquals(trailer, trailerRepository.findById(trailer.getKey()).get());
    }

    @Test
    public void updateTrailer(){
        trailerRepository.insert(trailer);
        trailer = trailerRepository.findById(trailer.getKey()).get();
        trailer.setTitle("title_2");
        trailerRepository.save(trailer);
        assertEquals("title_2", trailer.getTitle());
    }

    @Test
    public void getTrailer(){
        trailerRepository.insert(trailer);
        Trailer trailer2 = trailerRepository.findById(trailer.getKey()).get();
        assertEquals(trailer, trailer2);
    }

    @Test
    public void deleteTrailer(){
        trailerRepository.insert(trailer);
        trailerRepository.deleteById(trailer.getKey());
        assertEquals(Optional.empty(),trailerRepository.findById(trailer.getKey()));
    }
}
