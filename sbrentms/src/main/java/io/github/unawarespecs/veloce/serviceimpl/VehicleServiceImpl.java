package io.github.unawarespecs.veloce.serviceimpl;

import io.github.unawarespecs.veloce.entity.VehicleData;
import io.github.unawarespecs.veloce.enums.VehicleCategory;
import io.github.unawarespecs.veloce.model.Vehicle;
import io.github.unawarespecs.veloce.repository.VehicleDataRepository;
import io.github.unawarespecs.veloce.service.VehicleService;
import org.jspecify.annotations.NonNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class VehicleServiceImpl implements VehicleService {
    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    VehicleDataRepository vdr;

    @Override
    public Vehicle[] getVehicles() {
        List<VehicleData> vehicleData = new ArrayList<>();
        List<Vehicle> vehicles = new ArrayList<>();
        vdr.findAll().forEach(vehicleData::add);

        for (VehicleData datum : vehicleData) {
            Vehicle v = new Vehicle();

            v.setId(datum.getId());
            v.setBrand(datum.getBrand());
            v.setModel(datum.getModel());
            v.setName(datum.getName());
            v.setType(datum.getType());
            v.setPrice(datum.getPrice());
            v.setDailyRate(datum.getDailyRate());
            v.setSeats(datum.getSeats());
            v.setTransmission(datum.getTransmission());
            v.setFuel(datum.getFuel());
            v.setImagePath(datum.getImagePath());
            v.setTag(datum.getTag());

            logger.info(v.toString());
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
        Optional<VehicleData> opt = vdr.findById(id);
        if (opt.isPresent()) {
            logger.info("Found!");
            Vehicle v = new Vehicle();
            VehicleData datum = opt.get();
            v.setId(datum.getId());
            v.setType(datum.getType());
            v.setBrand(datum.getBrand());
            v.setModel(datum.getModel());
            v.setPrice(datum.getPrice());
            v.setDailyRate(datum.getDailyRate());
            v.setName(datum.getName());
            v.setSeats(datum.getSeats());
            v.setTransmission(datum.getTransmission());
            v.setFuel(datum.getFuel());
            v.setImagePath(datum.getImagePath());
            v.setTag(datum.getTag());
            return v;
        }
        logger.error("Error: Can't locate vehicle with ID {}", id);
        return null;
    }

    @Override
    public Vehicle addVehicle(Vehicle v) {
        logger.info("Adding new vehicle {}", v.toString());
        VehicleData datum = new VehicleData();
        datum.setType(v.getType());
        datum.setBrand(v.getBrand());
        datum.setModel(v.getModel());
        datum.setPrice(v.getPrice());
        datum.setDailyRate(v.getDailyRate());
        datum.setName(v.getName());
        datum.setSeats(v.getSeats());
        datum.setTransmission(v.getTransmission());
        datum.setFuel(v.getFuel());
        datum.setImagePath(v.getImagePath());
        datum.setTag(v.getTag());
        logger.info("Added new vehicle {} to database", v);
        return createVehicleFromRepo(datum);
    }

    @NonNull
    private Vehicle createVehicleFromRepo(VehicleData datum) {
        vdr.save(datum);

        Vehicle nv = new Vehicle();
        nv.setId(datum.getId());
        nv.setType(datum.getType());
        nv.setBrand(datum.getBrand());
        nv.setModel(datum.getModel());
        nv.setPrice(datum.getPrice());
        nv.setDailyRate(datum.getDailyRate());
        nv.setName(datum.getName());
        nv.setSeats(datum.getSeats());
        nv.setTransmission(datum.getTransmission());
        nv.setFuel(datum.getFuel());
        nv.setImagePath(datum.getImagePath());
        nv.setTag(datum.getTag());
        return nv;
    }

    @Override
    public Vehicle updateVehicle(Vehicle v) {
        Optional<VehicleData> opt = vdr.findById(v.getId());
        if (opt.isEmpty()) {
            logger.error("Error: Can't locate vehicle with ID {} for updating", v.getId());
            return null;
        }

        VehicleData datum = opt.get();
        if (v.getType() != null) {
            datum.setType(v.getType());
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
        Optional<VehicleData> opt = vdr.findById(id);
        if (opt.isPresent()) {
            VehicleData datum = opt.get();
            vdr.delete(datum);
            logger.info("Deleted {}!", datum);
        } else {
            logger.error("Error: Can't delete vehicle with ID {}", id);
        }
    }

    public List<VehicleData> findVehiclesByType(VehicleCategory type) {
        return vdr.findByType(type);
    }
}
