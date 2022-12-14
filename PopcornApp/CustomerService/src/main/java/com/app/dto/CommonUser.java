package com.app.dto;

import com.app.model.Image;
import com.app.model.Subscription;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommonUser {
    String email;
    String userName;
    Image profileImage;
    String password;
    Subscription subscription;

    public CommonUser(String email,String userName,String password){
        this.email=email;
        this.userName=userName;
        this.password=password;
    }
}
