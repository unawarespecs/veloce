package io.github.unawarespecs.veloce.serviceimpl;

import io.github.unawarespecs.veloce.entity.VehicleData;
import io.github.unawarespecs.veloce.enums.VehicleCategoryType;
import io.github.unawarespecs.veloce.model.Vehicle;
import io.github.unawarespecs.veloce.repository.VehicleDataRepository;
import io.github.unawarespecs.veloce.service.VehicleService;
import io.github.unawarespecs.veloce.transform.TransformVehicleService;
import org.jspecify.annotations.NonNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class VehicleServiceImpl implements VehicleService {
    Logger logger = LoggerFactory.getLogger(this.getClass());

    VehicleDataRepository vehicleDataRepository;
    TransformVehicleService transformVehicleService;

    public VehicleServiceImpl(VehicleDataRepository vdr, TransformVehicleService tvs) {
        this.vehicleDataRepository = vdr;
        this.transformVehicleService = tvs;
    }

    @Override
    public Vehicle[] getVehicles() {
        List<VehicleData> vehicleData = new ArrayList<>();
        List<Vehicle> vehicles = new ArrayList<>();
        vehicleDataRepository.findAll().forEach(vehicleData::add);

        for (VehicleData datum : vehicleData) {
            Vehicle v = transformVehicleService.transformFromVehicleData(datum);
            logger.debug(v.toString());
            vehicles.add(v);
        }

        Vehicle[] allVehicles = new Vehicle[vehicles.size()];
        for (int i = 0; i < vehicles.size(); i++) {
            allVehicles[i] = vehicles.get(i);
        }

        return allVehicles;
    }

    @Override
    public Vehicle getVehicle(Integer id) {
        logger.info("Getting info for vehicle {}", id);
        Optional<VehicleData> opt = vehicleDataRepository.findById(id);
        if (opt.isPresent()) {
            logger.info("Found!");
            VehicleData datum = opt.get();
            return transformVehicleService.transformFromVehicleData(datum);
        }
        logger.error("Error: Can't locate vehicle with ID {}", id);
        return null;
    }

    @Override
    public Vehicle addVehicle(Vehicle v) {
        logger.info("Adding new vehicle {}", v.toString());
        VehicleData datum = transformVehicleService.transformFromBaseVehicle(v);
        logger.info("Added new vehicle {} to database", v);
        return createVehicleFromRepo(datum);
    }

    @NonNull
    private Vehicle createVehicleFromRepo(VehicleData datum) {
        VehicleData savedDatum = vehicleDataRepository.save(datum);
        return transformVehicleService.transformFromVehicleData(savedDatum);
    }

    @Override
    public Vehicle updateVehicle(Vehicle v) {
        Optional<VehicleData> opt = vehicleDataRepository.findById(v.getId());
        if (opt.isEmpty()) {
            logger.error("Error: Can't locate vehicle with ID {} for updating", v.getId());
            return null;
        }

        VehicleData datum = opt.get();
        if (v.getCategory() != null) {
            datum.setCategory(v.getCategory());
        }
        if (v.getBrand() != null) {
            datum.setBrand(v.getBrand());
        }
        if (v.getModel() != null) {
            datum.setModel(v.getModel());
        }
        if (v.getPrice() != null) {
            datum.setPrice(v.getPrice());
        }
        if (v.getDailyRate() != null) {
            datum.setDailyRate(v.getDailyRate());
        }
        if (v.getName() != null) {
            datum.setName(v.getName());
        }
        if (v.getDescription() != null) {
            datum.setDescription(v.getDescription());
        }
        if (v.getSeats() != null) {
            datum.setSeats(v.getSeats());
        }
        if (v.getTransmission() != null) {
            datum.setTransmission(v.getTransmission());
        }
        if (v.getFuel() != null) {
            datum.setFuel(v.getFuel());
        }
        if (v.getImagePath() != null) {
            datum.setImagePath(v.getImagePath());
        }
        if (v.getTag() != null) {
            datum.setTag(v.getTag());
        }
        return createVehicleFromRepo(datum);
    }

    @Override
    public void delete(Integer id) {
        logger.info("Deleting vehicle {}", id);
        Optional<VehicleData> opt = vehicleDataRepository.findById(id);
        if (opt.isPresent()) {
            VehicleData datum = opt.get();
            vehicleDataRepository.delete(datum);
            logger.info("Deleted {}!", datum);
        } else {
            logger.error("Error: Can't delete vehicle with ID {}", id);
        }
    }

    public List<VehicleData> findVehiclesByType(VehicleCategoryType cat) {
        return vehicleDataRepository.findByCategory(cat);
    }
}
