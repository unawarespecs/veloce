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
            r.setEmail(datum.getEmail());
            r.setPassword(datum.getPassword());
            r.setRentedVehicleID(datum.getRentedVehicleID());
            r.setRentPlanID(datum.getRentPlanID());
            r.setVehicleName(datum.getVehicleName());
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
            r.setEmail(datum.getEmail());
            r.setPassword(datum.getPassword());
            r.setRentedVehicleID(datum.getRentedVehicleID());
            r.setRentPlanID(datum.getRentPlanID());
            r.setVehicleName(datum.getVehicleName());
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
        datum.setEmail(r.getEmail());
        datum.setPassword(r.getPassword());
        datum.setRentedVehicleID(r.getRentedVehicleID());
        datum.setRentPlanID(r.getRentPlanID());
        datum.setVehicleName(r.getVehicleName());
        logger.info("Added new renter {} to database", r);
        return createRenterFromRepo(datum);
    }

    @NonNull
    private Renter createRenterFromRepo(RenterData datum) {
        rdr.save(datum);

        Renter r = new Renter();
        r.setId(datum.getId());
        r.setName(datum.getName());
        r.setEmail(datum.getEmail());
        r.setPassword(datum.getPassword());
        r.setRentedVehicleID(datum.getRentedVehicleID());
        r.setRentPlanID(datum.getRentPlanID());
        r.setVehicleName(datum.getVehicleName());
        return r;
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
        if (r.getEmail() != null) {
            datum.setEmail(r.getEmail());
        }
        if (r.getPassword() != null) {
            datum.setPassword(r.getPassword());
        }
        if (r.getRentedVehicleID() != null) {
            datum.setRentedVehicleID(r.getRentedVehicleID());
        }
        if (r.getVehicleName() != null) {
            datum.setVehicleName(r.getVehicleName());
        }
        if (r.getRentPlanID() != null) {
            datum.setRentPlanID(r.getRentPlanID());
        }
        return createRenterFromRepo(datum);
    }

    @Override
    public Renter clearRentalDetails(Integer id) {
        Optional<RenterData> opt = rdr.findById(id);
        if (opt.isEmpty()) {
            logger.error("Error: Can't locate renter details with ID {} for clearing rental details", id);
            return null;
        }

        RenterData datum = opt.get();
        datum.setRentPlanID(null);
        datum.setRentedVehicleID(null);
        datum.setVehicleName(null);
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
