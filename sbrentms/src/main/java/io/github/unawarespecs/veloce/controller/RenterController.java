package io.github.unawarespecs.veloce.controller;

import io.github.unawarespecs.veloce.model.Renter;
import io.github.unawarespecs.veloce.service.RenterService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/renter")
@CrossOrigin(origins = "http://localhost:4200")
public class RenterController {
    Logger logger = LoggerFactory.getLogger(this.getClass());

    private final RenterService renterService;

    public RenterController(RenterService renterService) {
        this.renterService = renterService;
    }

    @GetMapping({"", "/"})
    public ResponseEntity<?> listRenters() {
        logger.info("GET /api/renter - listing all registered customers");
        ResponseEntity<?> resp;
        try {
            Renter[] renters = renterService.getRenters();
            resp = ResponseEntity.ok().body(renters);
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

    @PostMapping({"", "/"})
    public ResponseEntity<?> add(@RequestBody Renter re) {
        logger.info("POST /api/renter - adding {}", re.toString());
        ResponseEntity<?> resp;
        try {
            Renter newRenter = renterService.addRenter(re);
            logger.info("{} added", newRenter.toString());
            resp = ResponseEntity.ok(newRenter);
        } catch (Exception e) {
            logger.error("Failed to add renter {}: {}", re, e.getMessage());
            resp = ResponseEntity.internalServerError().body(e);
        }
        return resp;
    }

    @PutMapping({"", "/"})
    public ResponseEntity<?> update(@RequestBody Renter re) {
        logger.info("PUT /api/renter - updating details of {}", re.toString());
        ResponseEntity<?> resp;
        try {
            Renter updatedRenter = renterService.updateRenter(re);
            resp = ResponseEntity.ok(updatedRenter);
        } catch (Exception e) {
            logger.error("Failed to update renter {} details: {}", re, e.getMessage());
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
