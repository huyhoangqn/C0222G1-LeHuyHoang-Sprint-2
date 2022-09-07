package com.project.service;

import com.project.dto.RegisterRequest;
import com.project.model.account.AppUser;

import java.util.List;

public interface IAppUserService {

    AppUser findAppUserByUsername(String username);

    void save(AppUser appUser);

    void registerUser(RegisterRequest registerRequest);

    List<AppUser> findAll();
}
