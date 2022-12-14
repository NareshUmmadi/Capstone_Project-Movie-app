package com.app.JwtTokenGenerator;

import com.app.model.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class TokenGenerator implements ITokenGenerator {
    @Override
    public Map<String, String> generate_Token(User user) {
        Map<String, String> token = new HashMap<>();
        Map<String, Object> object = new HashMap<>();
        user.setPassword("");
        object.put("user", user);
        System.out.println("user in token"+user);
        String jwtToken = Jwts.builder()
                .setClaims(object)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis()+3600000))
                .signWith(SignatureAlgorithm.HS256, "movieAppKey")
                .compact();
        token.put("token", jwtToken);
        return token;
    }
}
