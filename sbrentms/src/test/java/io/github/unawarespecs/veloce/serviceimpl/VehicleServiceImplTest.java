package io.github.unawarespecs.veloce.serviceimpl;

import io.github.unawarespecs.veloce.entity.VehicleData;
import io.github.unawarespecs.veloce.enums.VehicleCategoryType;
import io.github.unawarespecs.veloce.enums.VehicleFuelType;
import io.github.unawarespecs.veloce.enums.VehicleTransmissionType;
import io.github.unawarespecs.veloce.model.Vehicle;
import io.github.unawarespecs.veloce.repository.VehicleDataRepository;
import io.github.unawarespecs.veloce.transformsrvimpl.TransformVehicleServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.concurrent.atomic.AtomicReference;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class VehicleServiceImplTest {
    @Mock
    private VehicleDataRepository vehicleDataRepository;
    private VehicleServiceImpl vehicleService;

    @BeforeEach
    void setUp() {
        vehicleService = new VehicleServiceImpl(vehicleDataRepository, new TransformVehicleServiceImpl());
    }

    @Test
    void addVehicleUsesGeneratedIdFromSavedEntity() {
        AtomicReference<Integer> idBeforeSave = new AtomicReference<>();
        when(vehicleDataRepository.save(any(VehicleData.class))).thenAnswer(invocation -> {
            VehicleData savedVehicle = invocation.getArgument(0);
            idBeforeSave.set(savedVehicle.getId());
            savedVehicle.setId(42);
            return savedVehicle;
        });

        Vehicle request = new Vehicle();
        request.setId(999);
        request.setBrand("Ferrari");
        request.setModel("Roma");
        request.setPrice(15000000.0);
        request.setName("Ferrari Roma");
        request.setDescription("");
        request.setCategory(VehicleCategoryType.Luxury);
        request.setDailyRate(19550.0);
        request.setSeats(2);
        request.setTransmission(VehicleTransmissionType.Automatic);
        request.setFuel(VehicleFuelType.Petrol);
        request.setImagePath("https://images.unsplash.com/photo-1535448580089-c7f9490c78b1?w=800&h=520&fit=crop&auto=format");
        request.setTag("");
        Vehicle result = vehicleService.addVehicle(request);

        verify(vehicleDataRepository).save(any(VehicleData.class));
        assertNull(idBeforeSave.get());
        assertEquals(42, result.getId());
    }
}
