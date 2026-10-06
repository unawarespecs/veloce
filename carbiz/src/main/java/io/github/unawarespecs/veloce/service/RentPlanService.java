package io.github.unawarespecs.veloce.service;

import io.github.unawarespecs.veloce.model.RentPlan;

public interface RentPlanService {
    RentPlan[] getPlans() throws Exception;
    RentPlan getPlan(Integer id) throws Exception;
    RentPlan addPlan(RentPlan rp) throws Exception;
    RentPlan updatePlan(RentPlan rp) throws Exception;
    void delete(Integer id) throws Exception;
    RentPlan[] listByRenterIdAndVehicleId(int renterID, int vehicleID);
}
