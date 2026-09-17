package io.github.unawarespecs.veloce.repository;

import io.github.unawarespecs.veloce.entity.VehicleData;
import io.github.unawarespecs.veloce.enums.VehicleCategory;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface VehicleDataRepository extends CrudRepository<VehicleData, Integer> {
    List<VehicleData> findByType(VehicleCategory type);
}
