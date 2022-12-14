package com.app.apigateway.controller.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FallbackController {
    @RequestMapping("/fallbackUrl")
    public ResponseEntity<?> fallbackMethod(){
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body("Sorry service down please try after sometime");
    }
}
