package io.github.unawarespecs.veloce.transformsrvimpl;

import io.github.unawarespecs.veloce.entity.RenterData;
import io.github.unawarespecs.veloce.model.Renter;
import io.github.unawarespecs.veloce.transform.TransformRenterService;
import org.springframework.stereotype.Service;

@Service
public class TransformRenterServiceImpl implements TransformRenterService {
    @Override
    public RenterData transformFromBaseRenter(Renter renter) {
        RenterData renterData = new RenterData();
        renterData.setName(renter.getName());
        renterData.setEmail(renter.getEmail());
        renterData.setPassword(renter.getPassword());
        renterData.setRentedVehicleID(renter.getRentedVehicleID());
        renterData.setRentPlanID(renter.getRentPlanID());
        renterData.setVehicleName(renter.getVehicleName());
        return renterData;
    }

    @Override
    public Renter transformFromRenterData(RenterData renterData) {
        Renter renter = new Renter();
        renter.setId(renterData.getId());
        renter.setName(renterData.getName());
        renter.setEmail(renterData.getEmail());
        renter.setPassword(renterData.getPassword());
        renter.setRentedVehicleID(renterData.getRentedVehicleID());
        renter.setRentPlanID(renterData.getRentPlanID());
        renter.setVehicleName(renterData.getVehicleName());
        return renter;
    }
}
