package com.example.Backend_final.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


import java.util.List;
@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Entreprise {
    private Long id;
    private String nom;
    private String logoURL;
    private List<AppUser> employees;
    private String logoSrc;
}
