package com.project.service.impl;

import com.project.model.Product;
import com.project.repository.IProductRepository;
import com.project.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class ProductService implements IProductService {

    @Autowired
    private IProductRepository productRepository;

    @Override
    public List<Product> getNewProducts() {
        return this.productRepository.getNewProducts();
    }

    @Override
    public void save(Product product) {
        product.setIsDeleted(false);
        product.setReleaseTime(new Date(System.currentTimeMillis()));
        this.productRepository.save(product);
    }

    @Override
    public Page<Product> findAll(Pageable pageable) {
        return this.productRepository.findAll(pageable);
    }

    @Override
    public Product findById(String id) {
       return this.productRepository.findById(Integer.valueOf(id)).orElse(null);
    }
}
