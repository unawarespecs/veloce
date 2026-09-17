package io.github.unawarespecs.veloce.service;

import io.github.unawarespecs.veloce.model.Renter;

public interface RenterService {
    Renter[] getRenters() throws Exception;
    Renter getRenter(Integer id) throws Exception;
    Renter addRenter(Renter r) throws Exception;
    Renter updateRenter(Renter r) throws Exception;
    void delete(Integer id) throws Exception;
}
