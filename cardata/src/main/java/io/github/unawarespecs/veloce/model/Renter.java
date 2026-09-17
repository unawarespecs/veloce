package io.github.unawarespecs.veloce.model;

import io.github.unawarespecs.veloce.enums.ModeOfPayment;
import lombok.Data;

@Data
public class Renter {
    private int id;
    private String name;
    private ModeOfPayment payMode;

    private Integer rentPlanID;
    private Integer rentedVehicleID;
    private String vehicleBrand;
    private String vehicleModel;
}
