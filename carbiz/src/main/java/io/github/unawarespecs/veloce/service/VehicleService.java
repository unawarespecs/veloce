package io.github.unawarespecs.veloce.service;

import io.github.unawarespecs.veloce.model.Vehicle;

public interface VehicleService {
    Vehicle[] getVehicles() throws Exception;
    Vehicle getVehicle(Integer id) throws Exception;
    Vehicle addVehicle(Vehicle v) throws Exception;
    Vehicle updateVehicle(Vehicle v) throws Exception;
    void delete(Integer id) throws Exception;
}
