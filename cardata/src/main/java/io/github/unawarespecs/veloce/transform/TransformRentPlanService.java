package io.github.unawarespecs.veloce.transform;

import io.github.unawarespecs.veloce.entity.RentPlanData;
import io.github.unawarespecs.veloce.model.RentPlan;

public interface TransformRentPlanService {
    RentPlanData transformFromBaseRentPlan(RentPlan rentPlan);
    RentPlan transformFromRentPlanData(RentPlanData rentPlanData);
}
