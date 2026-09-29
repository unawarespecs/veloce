package io.github.unawarespecs.veloce.model;

import io.github.unawarespecs.veloce.enums.ModeOfPayment;
import io.github.unawarespecs.veloce.enums.RentPlanStatusType;
import lombok.Data;

import java.util.Date;

@Data
public class RentPlan {
    private int id;
    private Integer renterID;
    private Integer vehicleID;
    private Date startRent;
    private Date endRent;
    private Integer daysRent;
    private Double totalPrice;
    private String customerName;
    private ModeOfPayment payMode;
    private RentPlanStatusType status;
}
