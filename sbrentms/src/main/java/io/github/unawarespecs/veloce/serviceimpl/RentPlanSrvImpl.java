package io.github.unawarespecs.veloce.serviceimpl;

import io.github.unawarespecs.veloce.entity.RentPlanData;
import io.github.unawarespecs.veloce.model.RentPlan;
import io.github.unawarespecs.veloce.repository.RentPlanDataRepository;
import io.github.unawarespecs.veloce.service.RentPlanService;
import io.github.unawarespecs.veloce.transform.TransformRentPlanService;
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

    RentPlanDataRepository rentPlanDataRepository;
    TransformRentPlanService transformRentPlanService;

    public RentPlanSrvImpl(RentPlanDataRepository rpdr, TransformRentPlanService trps) {
        this.rentPlanDataRepository = rpdr;
        this.transformRentPlanService = trps;
    }

    @Override
    public RentPlan[] getPlans() {
        List<RentPlanData> rentPlanDataList = new ArrayList<>();
        List<RentPlan> rentPlans = new ArrayList<>();
        rentPlanDataRepository.findAll().forEach(rentPlanDataList::add);

        for (RentPlanData datum : rentPlanDataList) {
            RentPlan rp = transformRentPlanService.transformFromRentPlanData(datum);
            logger.debug(rp.toString());
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
        Optional<RentPlanData> opt = rentPlanDataRepository.findById(id);
        if (opt.isPresent()) {
            logger.info("Found!");
            RentPlanData datum = opt.get();
            return transformRentPlanService.transformFromRentPlanData(datum);
        }
        logger.error("Error: Can't locate plan with ID {}", id);
        return null;
    }

    @Override
    public RentPlan addPlan(RentPlan rp) {
        logger.info("Adding new plan {}", rp.toString());
        RentPlanData datum = transformRentPlanService.transformFromBaseRentPlan(rp);
        logger.info("Added plan {} to database", rp);
        return createRentPlanFromRepo(datum);
    }

    @NonNull
    private RentPlan createRentPlanFromRepo(RentPlanData datum) {
        RentPlanData savedDatum = rentPlanDataRepository.save(datum);
        return transformRentPlanService.transformFromRentPlanData(savedDatum);
    }

    @Override
    public RentPlan updatePlan(RentPlan rp) {
        Optional<RentPlanData> opt = rentPlanDataRepository.findById(rp.getId());
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
        Optional<RentPlanData> opt = rentPlanDataRepository.findById(id);
        if (opt.isPresent()) {
            RentPlanData datum = opt.get();
            rentPlanDataRepository.delete(datum);
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
