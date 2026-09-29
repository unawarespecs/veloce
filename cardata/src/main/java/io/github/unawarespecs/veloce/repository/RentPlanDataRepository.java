package io.github.unawarespecs.veloce.repository;

import io.github.unawarespecs.veloce.entity.RentPlanData;
import org.springframework.data.repository.CrudRepository;

public interface RentPlanDataRepository extends CrudRepository<RentPlanData, Integer> {
    Iterable<RentPlanData> findAllByRenterIDAndVehicleID(int renterID, int vehicleID);
}
