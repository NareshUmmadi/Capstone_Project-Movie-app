package com.app.repository;

import com.app.model.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;


import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;


@ExtendWith(SpringExtension.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;
    private User user;
    private User savedUser;

    @BeforeEach
    public void setup() {
        user = new User("xyz@gmail.com", "pass123", "user", true);
        savedUser = userRepository.save(user);
    }

    @AfterEach
    public void clear() {
        user = null;
        savedUser = null;
    }

    @Test
    public void saveUser() {
        assertEquals("xyz@gmail.com", savedUser.getEmail());
        assertThat(savedUser).isNotNull();
    }

    @Test
    public void getUser() {
        User getUser = userRepository.findById(savedUser.getEmail()).get();
        assertEquals(getUser.getEmail(), savedUser.getEmail());
    }

    @Test
    public void deleteUser() {
        userRepository.deleteById(user.getEmail());
        assertEquals(Optional.empty(), userRepository.findById(user.getEmail()));
    }

    @Test
    public void updateUser() {
        savedUser.setRole("Admin");
        User updatedUser = userRepository.save(savedUser);
        assertEquals("Admin", savedUser.getRole());
    }

}
