package io.github.unawarespecs.veloce.model;

import lombok.Data;

import java.util.Date;

@Data
public class RentPlan {
    private int id;
    private Integer vehicleID;
    private Date startRent;
    private Date endRent;
    // Source of truth for vehicle daily rent rate. Sync this value to the Vehicle dailyRate field
    private Double rate;
}
