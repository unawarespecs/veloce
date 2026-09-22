package io.github.unawarespecs.veloce.model;

import io.github.unawarespecs.veloce.enums.VehicleFuelType;
import io.github.unawarespecs.veloce.enums.VehicleTransmissionType;
import io.github.unawarespecs.veloce.enums.VehicleCategoryType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Vehicle {
    private int id;
    private String brand;
    private String model;
    private Double price; // Full price of the vehicle when it was purchased. Do NOT display on frontend.

    // Vehicle description and characteristics (to display on web frontend).
    private String name;
    private String description;
    private VehicleCategoryType category;
    // Source of truth for vehicle daily rent rate. Try to sync daily rate with RentPlan rate field
    private Double dailyRate;
    private Integer seats;
    private VehicleTransmissionType transmission;
    private VehicleFuelType fuel;
    private String imagePath;
    private String tag;

    public String getFullName() {
        return brand + " " + model;
    }
}
