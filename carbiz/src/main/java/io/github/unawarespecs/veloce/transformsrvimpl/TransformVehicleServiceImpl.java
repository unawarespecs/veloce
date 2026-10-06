package io.github.unawarespecs.veloce.transformsrvimpl;

import io.github.unawarespecs.veloce.entity.VehicleData;
import io.github.unawarespecs.veloce.model.Vehicle;
import io.github.unawarespecs.veloce.transform.TransformVehicleService;
import org.springframework.stereotype.Service;

@Service
public class TransformVehicleServiceImpl implements TransformVehicleService {
    @Override
    public VehicleData transformFromBaseVehicle(Vehicle vehicle) {
        VehicleData datum = new VehicleData();
        datum.setCategory(vehicle.getCategory());
        datum.setBrand(vehicle.getBrand());
        datum.setModel(vehicle.getModel());
        datum.setPrice(vehicle.getPrice());
        datum.setDailyRate(vehicle.getDailyRate());
        datum.setName(vehicle.getName());
        datum.setDescription(vehicle.getDescription());
        datum.setSeats(vehicle.getSeats());
        datum.setTransmission(vehicle.getTransmission());
        datum.setFuel(vehicle.getFuel());
        datum.setImagePath(vehicle.getImagePath());
        datum.setTag(vehicle.getTag());
        return datum;
    }

    @Override
    public Vehicle transformFromVehicleData(VehicleData vehicleData) {
        Vehicle vehicle = new Vehicle();
        vehicle.setId(vehicleData.getId());
        vehicle.setCategory(vehicleData.getCategory());
        vehicle.setBrand(vehicleData.getBrand());
        vehicle.setModel(vehicleData.getModel());
        vehicle.setPrice(vehicleData.getPrice());
        vehicle.setDailyRate(vehicleData.getDailyRate());
        vehicle.setName(vehicleData.getName());
        vehicle.setDescription(vehicleData.getDescription());
        vehicle.setSeats(vehicleData.getSeats());
        vehicle.setTransmission(vehicleData.getTransmission());
        vehicle.setFuel(vehicleData.getFuel());
        vehicle.setImagePath(vehicleData.getImagePath());
        vehicle.setTag(vehicleData.getTag());
        return vehicle;
    }
}
