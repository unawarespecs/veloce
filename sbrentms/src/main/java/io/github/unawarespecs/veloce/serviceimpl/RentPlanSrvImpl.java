package io.github.unawarespecs.veloce.serviceimpl;

import io.github.unawarespecs.veloce.entity.RentPlanData;
import io.github.unawarespecs.veloce.model.RentPlan;
import io.github.unawarespecs.veloce.repository.RentPlanDataRepository;
import io.github.unawarespecs.veloce.service.RentPlanService;
import org.jspecify.annotations.NonNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RentPlanSrvImpl implements RentPlanService {
    Logger logger = LoggerFactory.getLogger(this.getClass());

    RentPlanDataRepository rpdr;

    public RentPlanSrvImpl(RentPlanDataRepository rpdr) {
        this.rpdr = rpdr;
    }

    @Override
    public RentPlan[] getPlans() {
        List<RentPlanData> rentPlanDataList = new ArrayList<>();
        List<RentPlan> rentPlans = new ArrayList<>();
        rpdr.findAll().forEach(rentPlanDataList::add);

        for (RentPlanData datum : rentPlanDataList) {
            RentPlan rp = new RentPlan();
            rp.setId(datum.getId());
            rp.setRenterID(datum.getRenterID());
            rp.setVehicleID(datum.getVehicleID());
            rp.setStartRent(datum.getStartRent());
            rp.setEndRent(datum.getEndRent());
            rp.setTotalPrice(datum.getTotalPrice());
            rp.setDaysRent(datum.getDaysRent());
            rp.setCustomerName(datum.getCustomerName());
            rp.setPayMode(datum.getPayMode());
            rp.setStatus(datum.getStatus());
            rentPlans.add(rp);
        }

        RentPlan[] allRentPlans = new RentPlan[rentPlans.size()];
        for (int i = 0; i < rentPlans.size(); i++) {
            allRentPlans[i] = rentPlans.get(i);
        }
        return allRentPlans;
    }

    @Override
    public RentPlan getPlan(Integer id) {
        logger.info("Getting info for plan {}", id);
        Optional<RentPlanData> opt = rpdr.findById(id);
        if (opt.isPresent()) {
            logger.info("Found!");
            RentPlan rp = new RentPlan();
            RentPlanData datum = opt.get();
            rp.setId(datum.getId());
            rp.setRenterID(datum.getRenterID());
            rp.setVehicleID(datum.getVehicleID());
            rp.setStartRent(datum.getStartRent());
            rp.setEndRent(datum.getEndRent());
            rp.setTotalPrice(datum.getTotalPrice());
            rp.setDaysRent(datum.getDaysRent());
            rp.setCustomerName(datum.getCustomerName());
            rp.setPayMode(datum.getPayMode());
            rp.setStatus(datum.getStatus());
            return rp;
        }
        logger.error("Error: Can't locate plan with ID {}", id);
        return null;
    }

    @Override
    public RentPlan addPlan(RentPlan rp) {
        logger.info("Adding new plan {}", rp.toString());
        RentPlanData datum = new RentPlanData();
        datum.setRenterID(rp.getRenterID());
        datum.setVehicleID(rp.getVehicleID());
        datum.setStartRent(rp.getStartRent());
        datum.setEndRent(rp.getEndRent());
        datum.setTotalPrice(rp.getTotalPrice());
        datum.setCustomerName(rp.getCustomerName());
        datum.setDaysRent(rp.getDaysRent());
        datum.setPayMode(rp.getPayMode());
        datum.setStatus(rp.getStatus());
        logger.info("Added plan {} to database", rp);
        return createRentPlanFromRepo(datum);
    }

    @NonNull
    private RentPlan createRentPlanFromRepo(RentPlanData datum) {
        rpdr.save(datum);

        RentPlan rp = new RentPlan();
        rp.setId(datum.getId());
        rp.setRenterID(datum.getRenterID());
        rp.setVehicleID(datum.getVehicleID());
        rp.setStartRent(datum.getStartRent());
        rp.setEndRent(datum.getEndRent());
        rp.setTotalPrice(datum.getTotalPrice());
        rp.setDaysRent(datum.getDaysRent());
        rp.setCustomerName(datum.getCustomerName());
        rp.setPayMode(datum.getPayMode());
        rp.setStatus(datum.getStatus());
        return rp;
    }

    @Override
    public RentPlan updatePlan(RentPlan rp) {
        Optional<RentPlanData> opt = rpdr.findById(rp.getId());
        if (opt.isEmpty()) {
            logger.error("Error: Can't locate plan with ID {} for updating", rp.getId());
            return null;
        }

        RentPlanData datum = opt.get();
        if (rp.getRenterID() != null) {
            datum.setRenterID(rp.getRenterID());
        }
        if (rp.getVehicleID() != null) {
            datum.setVehicleID(rp.getVehicleID());
        }
        if (rp.getStartRent() != null) {
            datum.setStartRent(rp.getStartRent());
        }
        if (rp.getEndRent() != null) {
            datum.setEndRent(rp.getEndRent());
        }
        if (rp.getTotalPrice() != null) {
            datum.setTotalPrice(rp.getTotalPrice());
        }
        if (rp.getDaysRent() != null) {
            datum.setDaysRent(rp.getDaysRent());
        }
        if (rp.getCustomerName() != null) {
            datum.setCustomerName(rp.getCustomerName());
        }
        if (rp.getPayMode() != null) {
            datum.setPayMode(rp.getPayMode());
        }
        if (rp.getStatus() != null) {
            datum.setStatus(rp.getStatus());
        }
        return createRentPlanFromRepo(datum);
    }

    @Override
    public void delete(Integer id) {
        logger.info("Deleting plan {}", id);
        Optional<RentPlanData> opt = rpdr.findById(id);
        if (opt.isPresent()) {
            RentPlanData datum = opt.get();
            rpdr.delete(datum);
            logger.info("Deleted {}!", datum);
        } else {
            logger.error("Error: Can't delete plan with ID {}", id);
        }
    }

    @Override
    public RentPlan[] listByRenterIdAndVehicleId(int renterID, int vehicleID) {
        List<RentPlanData> rentPlanData = new ArrayList<>();
        List<RentPlan> rentPlans = new ArrayList<>();
//        rpdr.findAllByRenterIDAndVehicleID()
        return new RentPlan[0];
    }
}
