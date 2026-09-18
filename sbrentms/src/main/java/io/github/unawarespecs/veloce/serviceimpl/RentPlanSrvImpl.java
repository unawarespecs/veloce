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
            rp.setVehicleID(datum.getVehicleID());
            rp.setStartRent(datum.getStartRent());
            rp.setEndRent(datum.getEndRent());
            rp.setRate(datum.getRate());
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
            rp.setVehicleID(datum.getVehicleID());
            rp.setStartRent(datum.getStartRent());
            rp.setEndRent(datum.getEndRent());
            rp.setRate(datum.getRate());
            return rp;
        }
        logger.error("Error: Can't locate plan with ID {}", id);
        return null;
    }

    @Override
    public RentPlan addPlan(RentPlan rp) {
        logger.info("Adding new plan {}", rp.toString());
        RentPlanData datum = new RentPlanData();
        datum.setVehicleID(rp.getVehicleID());
        datum.setStartRent(rp.getStartRent());
        datum.setEndRent(rp.getEndRent());
        datum.setRate(rp.getRate());
        logger.info("Added plan {} to database", rp);
        return createRentPlanFromRepo(datum);
    }

    @NonNull
    private RentPlan createRentPlanFromRepo(RentPlanData datum) {
        rpdr.save(datum);

        RentPlan nrp = new RentPlan();
        nrp.setId(datum.getId());
        nrp.setVehicleID(datum.getVehicleID());
        nrp.setStartRent(datum.getStartRent());
        nrp.setEndRent(datum.getEndRent());
        nrp.setRate(datum.getRate());
        return nrp;
    }

    @Override
    public RentPlan updatePlan(RentPlan rp) {
        Optional<RentPlanData> opt = rpdr.findById(rp.getId());
        if (opt.isEmpty()) {
            logger.error("Error: Can't locate plan with ID {} for updating", rp.getId());
            return null;
        }

        RentPlanData datum = opt.get();
        if (rp.getVehicleID() != null) {
            datum.setVehicleID(rp.getVehicleID());
        }
        if (rp.getStartRent() != null) {
            datum.setStartRent(rp.getStartRent());
        }
        if (rp.getEndRent() != null) {
            datum.setEndRent(rp.getEndRent());
        }
        if (rp.getRate() != null) {
            datum.setRate(rp.getRate());
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
}
