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
    private Double price; // Full price of the vehicle when it was purchased

    // Vehicle description and characteristics (to display on web frontend).
    private String name;
    private VehicleCategoryType category;
    private Double dailyRate; // Try to sync daily rate with RentPlan rate field
    private Integer seats;
    private VehicleTransmissionType transmission;
    private VehicleFuelType fuel;
    private String imagePath;
    private String tag;

    public String getFullName() {
        return brand + " " + model;
    }
}
