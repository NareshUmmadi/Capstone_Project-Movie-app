package com.app.controller;


import com.app.exception.UserNotFound;
import com.app.model.SubType;
import com.app.model.Trailer;
import com.app.service.IAdminService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("admin")
public class AdminController {
    @Autowired
    IAdminService adminService;

    @PostMapping("/admin/trailer")
    public ResponseEntity<?> addTrailer(@RequestBody Trailer trailer){
        return ResponseEntity.status(HttpStatus.CREATED).body(adminService.addTrailer(trailer));
    }

    @DeleteMapping("/admin/trailer")
    public ResponseEntity<?> deleteTrailer(@RequestBody Trailer trailer){
        return ResponseEntity.status(HttpStatus.OK).body(adminService.removeTrailer(trailer));
    }

    @PutMapping("/admin/credits/{email}/{credits}")
    public ResponseEntity<?> giveCredits(@PathVariable String email, @PathVariable Double credits) throws UserNotFound {
        return ResponseEntity.status(HttpStatus.OK).body(adminService.giveCredits(email, credits));
    }

    @PostMapping("/admin/free-subs/{email}/{type}")
    public ResponseEntity<?> giveFreeSubscription(@PathVariable String email, @PathVariable String type) throws UserNotFound {
        return ResponseEntity.status(HttpStatus.OK).body(adminService.giveFreeSubscription(email, type));
    }

    @PostMapping("/user/subscribe/{email}/{type}")
    public ResponseEntity<?> activateSubscription(@PathVariable String email, @PathVariable String type) throws UserNotFound {
        return ResponseEntity.status(HttpStatus.OK).body(adminService.activateSubscription(email, type));
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers(){
        return ResponseEntity.ok(adminService.getAllUsers());
    }

}
