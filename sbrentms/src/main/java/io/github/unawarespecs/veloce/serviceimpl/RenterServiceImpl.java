package io.github.unawarespecs.veloce.serviceimpl;

import io.github.unawarespecs.veloce.entity.RenterData;
import io.github.unawarespecs.veloce.model.Renter;
import io.github.unawarespecs.veloce.repository.RenterDataRepository;
import io.github.unawarespecs.veloce.service.RenterService;
import org.jspecify.annotations.NonNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RenterServiceImpl implements RenterService {
    Logger logger = LoggerFactory.getLogger(this.getClass());

    RenterDataRepository rdr;

    public RenterServiceImpl(RenterDataRepository rdr) {
        this.rdr = rdr;
    }

    @Override
    public Renter[] getRenters() throws Exception {
        List<RenterData> renterData = new ArrayList<>();
        List<Renter> renters = new ArrayList<>();
        rdr.findAll().forEach(renterData::add);

        for (RenterData datum : renterData) {
            Renter r = new Renter();

            r.setId(datum.getId());
            r.setName(datum.getName());
            r.setPayMode(datum.getPayMode());
            r.setRentedVehicleID(datum.getRentedVehicleID());
            r.setVehicleBrand(datum.getVehicleBrand());
            r.setVehicleModel(datum.getVehicleModel());
            r.setRentPlanID(datum.getRentPlanID());
            renters.add(r);
        }

        Renter[] allRenters = new Renter[renters.size()];
        for (int i = 0; i < renters.size(); i++) {
            allRenters[i] = renters.get(i);
        }

        return allRenters;
    }

    @Override
    public Renter getRenter(Integer id) {
        logger.info("Getting info for renter {}", id);
        Optional<RenterData> opt = rdr.findById(id);
        if (opt.isPresent()) {
            logger.info("Found!");
            Renter r = new Renter();
            RenterData datum = opt.get();
            r.setId(datum.getId());
            r.setName(datum.getName());
            r.setPayMode(datum.getPayMode());
            r.setRentedVehicleID(datum.getRentedVehicleID());
            r.setVehicleBrand(datum.getVehicleBrand());
            r.setVehicleModel(datum.getVehicleModel());
            r.setRentPlanID(datum.getRentPlanID());
            return r;
        }
        logger.error("Error: Can't locate renter details with ID {}", id);
        return null;
    }

    @Override
    public Renter addRenter(Renter r) {
        logger.info("Adding new renter {}", r.toString());
        RenterData datum = new RenterData();
        datum.setName(r.getName());
        datum.setPayMode(r.getPayMode());
        datum.setRentedVehicleID(r.getRentedVehicleID());
        datum.setVehicleBrand(r.getVehicleBrand());
        datum.setVehicleModel(r.getVehicleModel());
        datum.setRentPlanID(r.getRentPlanID());
        logger.info("Added new renter {} to database", r);
        return createRenterFromRepo(datum);
    }

    @NonNull
    private Renter createRenterFromRepo(RenterData datum) {
        rdr.save(datum);

        Renter nr = new Renter();
        nr.setId(datum.getId());
        nr.setName(datum.getName());
        nr.setPayMode(datum.getPayMode());
        nr.setRentedVehicleID(datum.getRentedVehicleID());
        nr.setVehicleBrand(datum.getVehicleBrand());
        nr.setVehicleModel(datum.getVehicleModel());
        nr.setRentPlanID(datum.getRentPlanID());
        return nr;
    }

    @Override
    public Renter updateRenter(Renter r) {

        Optional<RenterData> opt = rdr.findById(r.getId());
        if (opt.isEmpty()) {
            logger.error("Error: Can't locate renter details with ID {} for updating", r.getId());
            return null;
        }
        RenterData datum = opt.get();
        if (r.getName() != null) {
            datum.setName(r.getName());
        }
        if (r.getPayMode() != null) {
            datum.setPayMode(r.getPayMode());
        }
        if (r.getRentedVehicleID() != null) {
            datum.setRentedVehicleID(r.getRentedVehicleID());
        }
        if (r.getVehicleBrand() != null) {
            datum.setVehicleBrand(r.getVehicleBrand());
        }
        if (r.getVehicleModel() != null) {
            datum.setVehicleModel(r.getVehicleModel());
        }
        if (r.getRentPlanID() != null) {
            datum.setRentPlanID(r.getRentPlanID());
        }
        return createRenterFromRepo(datum);
    }

    @Override
    public void delete(Integer id) {
        logger.info("Deleting renter {}", id);
        Optional<RenterData> opt = rdr.findById(id);
        if (opt.isPresent()) {
            RenterData datum = opt.get();
            rdr.delete(datum);
            logger.info("Deleted {}!", datum);
        } else {
            logger.error("Error: Can't delete renter details with ID {}", id);
        }
    }
}
