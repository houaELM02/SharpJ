package com.example.Backend_final.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;



@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AppUser {
    private String id;
    private String firstName;
    private String lastName;
    private String functionality;
    private String ImageName;
    private Entreprise entreprise;
    private boolean online;
    private String ImageSrc;


}

