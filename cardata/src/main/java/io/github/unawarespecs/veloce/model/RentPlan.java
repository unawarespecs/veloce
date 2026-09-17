package io.github.unawarespecs.veloce.model;

import lombok.Data;

import java.util.Date;

@Data
public class RentPlan {
    private int id;
    private Integer vehicleID;
    private Date startRent;
    private Date endRent;
    @Deprecated(forRemoval = true)
    private Double rate;
}
