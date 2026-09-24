package io.github.unawarespecs.veloce.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.github.unawarespecs.veloce.enums.ModeOfPayment;
import lombok.Data;
import lombok.ToString;

@Data
public class Renter {
    private int id;
    private String name;
    private String email;
    @ToString.Exclude
    private String password;

    private Integer rentPlanID;
    private Integer rentedVehicleID;
    private String vehicleName;
}
