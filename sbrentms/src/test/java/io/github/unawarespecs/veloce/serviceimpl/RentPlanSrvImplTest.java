package io.github.unawarespecs.veloce.serviceimpl;

import io.github.unawarespecs.veloce.entity.RentPlanHistoryData;
import io.github.unawarespecs.veloce.enums.ModeOfPayment;
import io.github.unawarespecs.veloce.enums.RentPlanStatusType;
import io.github.unawarespecs.veloce.model.RentPlan;
import io.github.unawarespecs.veloce.repository.RentPlanDataRepository;
import io.github.unawarespecs.veloce.repository.RentPlanHistoryDataRepository;
import io.github.unawarespecs.veloce.transform.TransformRentPlanService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class RentPlanSrvImplTest {
    @Mock
    private RentPlanDataRepository rentPlanDataRepository;
    @Mock
    private RentPlanHistoryDataRepository rentPlanHistoryDataRepository;
    @Mock
    private TransformRentPlanService transformRentPlanService;

    private RentPlanSrvImpl rentPlanService;

    @BeforeEach
    void setUp() {
        rentPlanService = new RentPlanSrvImpl(
                rentPlanDataRepository,
                rentPlanHistoryDataRepository,
                transformRentPlanService
        );
    }

    @Test
    void addPlanToHistorySavesHistoryDataAndReturnsRentPlan() {
        RentPlan inputPlan = new RentPlan();
        inputPlan.setId(101);
        inputPlan.setRenterID(1);
        inputPlan.setVehicleID(2);
        inputPlan.setCustomerName("John Doe");
        inputPlan.setDaysRent(3);
        inputPlan.setTotalPrice(12000.0);
        inputPlan.setPayMode(ModeOfPayment.Cash);
        inputPlan.setStatus(RentPlanStatusType.Cancelled);
        inputPlan.setStartRent(new Date());
        inputPlan.setEndRent(new Date());

        when(rentPlanHistoryDataRepository.save(any(RentPlanHistoryData.class))).thenAnswer(invocation -> {
            RentPlanHistoryData data = invocation.getArgument(0);
            data.setId(1);
            return data;
        });

        RentPlan result = rentPlanService.addPlanToHistory(inputPlan);

        verify(rentPlanHistoryDataRepository).save(any(RentPlanHistoryData.class));
        assertNotNull(result);
        assertEquals(101, result.getId());
        assertEquals(1, result.getRenterID());
        assertEquals(2, result.getVehicleID());
        assertEquals(RentPlanStatusType.Cancelled, result.getStatus());
        assertEquals("John Doe", result.getCustomerName());
    }

    @Test
    void getPlanHistoryByRenterIdReturnsMappedPlans() {
        RentPlanHistoryData historyData = new RentPlanHistoryData();
        historyData.setId(1);
        historyData.setOriginalRentPlanId(101);
        historyData.setRenterID(1);
        historyData.setVehicleID(2);
        historyData.setCustomerName("John Doe");
        historyData.setStatus(RentPlanStatusType.Cancelled);
        historyData.setTotalPrice(12000.0);

        when(rentPlanHistoryDataRepository.findAllByRenterID(1)).thenReturn(List.of(historyData));

        RentPlan[] results = rentPlanService.getPlanHistoryByRenterId(1);

        assertEquals(1, results.length);
        assertEquals(101, results[0].getId());
        assertEquals(1, results[0].getRenterID());
        assertEquals(RentPlanStatusType.Cancelled, results[0].getStatus());
    }
}
