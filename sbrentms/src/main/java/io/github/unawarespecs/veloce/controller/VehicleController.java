package io.github.unawarespecs.veloce.controller;

import io.github.unawarespecs.veloce.model.Vehicle;
import io.github.unawarespecs.veloce.service.VehicleService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vehicle")
public class VehicleController {
    Logger logger = LoggerFactory.getLogger(this.getClass());

    private final VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @GetMapping("/")
    public ResponseEntity<?> listVehicles() {
        logger.info("GET /api/vehicle - listing all registered vehicles");
        ResponseEntity<?> resp;
        try {
            Vehicle[] vehicles = vehicleService.getVehicles();
            resp = ResponseEntity.ok().body(vehicles);
        } catch (Exception e) {
            resp = ResponseEntity.internalServerError().body(e);
        }
        return resp;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable final Integer id) {
        logger.info("GET /api/vehicle/{} - getting details", id);
        ResponseEntity<?> resp;
        try {
            Vehicle v = vehicleService.getVehicle(id);
            resp = ResponseEntity.ok(v);
        } catch (Exception e) {
            resp = ResponseEntity.internalServerError().body(e.getMessage());
        }
        return resp;
    }

    @PutMapping("/")
    public ResponseEntity<?> add(@RequestBody Vehicle v) {
        logger.info("PUT /api/vehicle - adding {}", v.toString());
        ResponseEntity<?> resp;
        try {
            Vehicle newVehicle = vehicleService.addVehicle(v);
            logger.info("{} added", newVehicle.toString());
            resp = ResponseEntity.ok(newVehicle);
        } catch (Exception e) {
            logger.error("Failed to add vehicle {}: {}", v, e.getMessage());
            resp = ResponseEntity.internalServerError().body(e);
        }
        return resp;
    }

    @PostMapping("/")
    public ResponseEntity<?> update(@RequestBody Vehicle v) {
        logger.info("POST /api/vehicle - updating details of {}", v.toString());
        ResponseEntity<?> resp;
        try {
            Vehicle updatedVehicle = vehicleService.updateVehicle(v);
            resp = ResponseEntity.ok(updatedVehicle);
        } catch (Exception e) {
            logger.error("Failed to update vehicle {} details: {}", v, e.getMessage());
            resp = ResponseEntity.internalServerError().body(e);
        }
        return resp;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable final Integer id) {
        logger.info("DELETE /api/vehicle/{} - attempting", id);
        ResponseEntity<?> resp;
        try {
            vehicleService.delete(id);
            resp = ResponseEntity.ok(null);
        } catch (Exception e) {
            resp = ResponseEntity.internalServerError().body(e.getMessage());
        }
        return resp;
    }
}
