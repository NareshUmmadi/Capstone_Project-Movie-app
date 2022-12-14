package com.app.repository;

import com.app.model.Trailer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrailerRepository extends MongoRepository<Trailer,String> {
}
