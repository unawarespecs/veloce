package io.github.unawarespecs.veloce.controller;

import io.github.unawarespecs.veloce.model.Renter;
import io.github.unawarespecs.veloce.service.RenterService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/renter")
public class RenterController {
    Logger logger = LoggerFactory.getLogger(this.getClass());

    private RenterService renterService;

    public RenterController(RenterService renterService) {
        this.renterService = renterService;
    }

    @GetMapping("/")
    public ResponseEntity<?> listRentPlans() {
        logger.info("GET /api/renter - listing all registered customers");
        ResponseEntity<?> resp;
        try {
            Renter[] rentplans = renterService.getRenters();
            resp = ResponseEntity.ok().body(rentplans);
        } catch (Exception e) {
            resp = ResponseEntity.internalServerError().body(e);
        }
        return resp;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable final Integer id) {
        logger.info("GET /api/renter/{} - getting details", id);
        ResponseEntity<?> resp;
        try {
            Renter re = renterService.getRenter(id);
            resp = ResponseEntity.ok(re);
        } catch (Exception e) {
            resp = ResponseEntity.internalServerError().body(e.getMessage());
        }
        return resp;
    }

    @PutMapping("/")
    public ResponseEntity<?> add(@RequestBody Renter re) {
        logger.info("PUT /api/renter - adding {}", re.toString());
        ResponseEntity<?> resp;
        try {
            Renter newRentPlan = renterService.addRenter(re);
            logger.info("{} added", newRentPlan.toString());
            resp = ResponseEntity.ok(newRentPlan);
        } catch (Exception e) {
            logger.error("Failed to add plan {}: {}", re, e.getMessage());
            resp = ResponseEntity.internalServerError().body(e);
        }
        return resp;
    }

    @PostMapping("/")
    public ResponseEntity<?> update(@RequestBody Renter re) {
        logger.info("POST /api/renter - updating details of {}", re.toString());
        ResponseEntity<?> resp;
        try {
            Renter updatedRenter = renterService.updateRenter(re);
            resp = ResponseEntity.ok(updatedRenter);
        } catch (Exception e) {
            logger.error("Failed to update vehicle {} details: {}", re, e.getMessage());
            resp = ResponseEntity.internalServerError().body(e);
        }
        return resp;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable final Integer id) {
        logger.info("DELETE /api/renter/{} - attempting", id);
        ResponseEntity<?> resp;
        try {
            renterService.delete(id);
            resp = ResponseEntity.ok(null);
        } catch (Exception e) {
            resp = ResponseEntity.internalServerError().body(e.getMessage());
        }
        return resp;
    }
}
