package com.project.service.impl;

import com.project.model.Category;
import com.project.repository.ICategoryRepository;
import com.project.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService implements ICategoryService {

    @Autowired
    private ICategoryRepository categoryRepository;

    @Override
    public List<Category> findAll() {
        return this.categoryRepository.getAllCategory();
    }
}
