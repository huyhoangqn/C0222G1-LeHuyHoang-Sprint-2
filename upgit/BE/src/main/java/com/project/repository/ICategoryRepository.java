package com.project.repository;

import com.project.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ICategoryRepository extends JpaRepository<Category, Integer> {

    @Query(value = " select * from category where is_deleted = 0 ", nativeQuery = true)
    List<Category> getAllCategory();
}
