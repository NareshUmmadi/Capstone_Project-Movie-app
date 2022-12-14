package com.app.JwtTokenGenerator;

import com.app.model.User;

import java.util.Map;

public interface ITokenGenerator {
    public Map<String, String> generate_Token(User user);
}
