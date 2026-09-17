package io.github.unawarespecs.veloce.controller;

import io.github.unawarespecs.veloce.model.RentPlan;
import io.github.unawarespecs.veloce.service.RentPlanService;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@NoArgsConstructor
@RequestMapping("/api/rentplan")
public class RentPlanController {
    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private RentPlanService rentPlanService;

    @GetMapping("/")
    public ResponseEntity<?> listRentPlans() {
        logger.info("GET /api/rentplan - listing all plans");
        ResponseEntity<?> resp;
        try {
            RentPlan[] rentplans = rentPlanService.getPlans();
            resp = ResponseEntity.ok().body(rentplans);
        } catch (Exception e) {
            resp = ResponseEntity.internalServerError().body(e);
        }
        return resp;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable final Integer id) {
        logger.info("GET /api/rentplan/{} - getting details", id);
        ResponseEntity<?> resp;
        try {
            RentPlan rp = rentPlanService.getPlan(id);
            resp = ResponseEntity.ok(rp);
        } catch (Exception e) {
            resp = ResponseEntity.internalServerError().body(e.getMessage());
        }
        return resp;
    }

    @PutMapping("/")
    public ResponseEntity<?> add(@RequestBody RentPlan rp) {
        logger.info("PUT /api/rentplan - adding {}", rp.toString());
        ResponseEntity<?> resp;
        try {
            RentPlan newRentPlan = rentPlanService.addPlan(rp);
            logger.info("{} added", newRentPlan.toString());
            resp = ResponseEntity.ok(newRentPlan);
        } catch (Exception e) {
            logger.error("Failed to add plan {}: {}", rp, e.getMessage());
            resp = ResponseEntity.internalServerError().body(e);
        }
        return resp;
    }

    @PostMapping("/")
    public ResponseEntity<?> update(@RequestBody RentPlan rp) {
        logger.info("POST /api/rentplan - updating details of {}", rp.toString());
        ResponseEntity<?> resp;
        try {
            RentPlan updRentPlan = rentPlanService.updatePlan(rp);
            resp = ResponseEntity.ok(updRentPlan);
        } catch (Exception e) {
            logger.error("Failed to update vehicle {} details: {}", rp, e.getMessage());
            resp = ResponseEntity.internalServerError().body(e);
        }
        return resp;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable final Integer id) {
        logger.info("DELETE /api/rentplan/{} - attempting", id);
        ResponseEntity<?> resp;
        try {
            rentPlanService.delete(id);
            resp = ResponseEntity.ok(null);
        } catch (Exception e) {
            resp = ResponseEntity.internalServerError().body(e.getMessage());
        }
        return resp;
    }
}
