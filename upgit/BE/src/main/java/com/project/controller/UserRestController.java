package com.project.controller;

import com.project.model.account.AppUser;
import com.project.repository.IAppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class UserRestController {

    @Autowired
    private IAppUserRepository appUserRepository;

    @PreAuthorize("isAuthenticated()")
    @GetMapping(value = "/users")
    public ResponseEntity<List<AppUser>> getAllUser() {
        List<AppUser> appUsers = this.appUserRepository.findAll();
        return new ResponseEntity<>(appUsers, HttpStatus.OK);
    }
}
