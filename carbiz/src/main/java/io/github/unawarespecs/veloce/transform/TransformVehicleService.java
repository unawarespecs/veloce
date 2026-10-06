package io.github.unawarespecs.veloce.transform;

import io.github.unawarespecs.veloce.entity.VehicleData;
import io.github.unawarespecs.veloce.model.Vehicle;

public interface TransformVehicleService {
    VehicleData transformFromBaseVehicle(Vehicle vehicle);
    Vehicle transformFromVehicleData(VehicleData vehicleData);
}
