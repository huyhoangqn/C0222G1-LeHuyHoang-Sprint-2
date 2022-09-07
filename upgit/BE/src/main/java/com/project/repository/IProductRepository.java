package com.project.repository;

import com.project.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IProductRepository extends JpaRepository<Product, Integer> {

    @Query(value = " SELECT * FROM product where is_deleted = 0 order by release_time desc limit 8 ", nativeQuery = true)
    List<Product> getNewProducts();
}
