package io.github.unawarespecs.veloce.transform;

import io.github.unawarespecs.veloce.entity.RenterData;
import io.github.unawarespecs.veloce.model.Renter;

public interface TransformRenterService {
    RenterData transformFromBaseRenter(Renter renter);
    Renter transformFromRenterData(RenterData renterData);
}
