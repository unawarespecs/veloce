package io.github.unawarespecs.veloce.transformsrvimpl;

import io.github.unawarespecs.veloce.entity.RentPlanData;
import io.github.unawarespecs.veloce.model.RentPlan;
import io.github.unawarespecs.veloce.transform.TransformRentPlanService;
import org.springframework.stereotype.Service;

@Service
public class TransformRentPlanSrvImpl implements TransformRentPlanService {
    @Override
    public RentPlanData transformFromBaseRentPlan(RentPlan rentPlan) {
        RentPlanData rentPlanData = new RentPlanData();
        rentPlanData.setRenterID(rentPlan.getRenterID());
        rentPlanData.setVehicleID(rentPlan.getVehicleID());
        rentPlanData.setStartRent(rentPlan.getStartRent());
        rentPlanData.setEndRent(rentPlan.getEndRent());
        rentPlanData.setTotalPrice(rentPlan.getTotalPrice());
        rentPlanData.setCustomerName(rentPlan.getCustomerName());
        rentPlanData.setDaysRent(rentPlan.getDaysRent());
        rentPlanData.setPayMode(rentPlan.getPayMode());
        rentPlanData.setStatus(rentPlan.getStatus());
        return rentPlanData;
    }

    @Override
    public RentPlan transformFromRentPlanData(RentPlanData rentPlanData) {
        RentPlan rentPlan = new RentPlan();
        rentPlan.setId(rentPlanData.getId());
        rentPlan.setRenterID(rentPlanData.getRenterID());
        rentPlan.setVehicleID(rentPlanData.getVehicleID());
        rentPlan.setStartRent(rentPlanData.getStartRent());
        rentPlan.setEndRent(rentPlanData.getEndRent());
        rentPlan.setTotalPrice(rentPlanData.getTotalPrice());
        rentPlan.setDaysRent(rentPlanData.getDaysRent());
        rentPlan.setCustomerName(rentPlanData.getCustomerName());
        rentPlan.setPayMode(rentPlanData.getPayMode());
        rentPlan.setStatus(rentPlanData.getStatus());
        return rentPlan;
    }
}
