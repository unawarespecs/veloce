package io.github.unawarespecs.veloce.model;

import org.junit.jupiter.api.Test;
import tools.jackson.databind.json.JsonMapper;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class VehicleRequestBindingTest {
    @Test
    void requestWithoutIdDeserializesWithNullId() {
        Vehicle vehicle = JsonMapper.builder().build().readValue("""
                {
                  "brand": "Ferrari",
                  "model": "Roma",
                  "price": 15000000,
                  "name": "Ferrari Roma",
                  "description": "",
                  "category": "Luxury",
                  "dailyRate": 19550,
                  "seats": 2,
                  "transmission": "Automatic",
                  "fuel": "Petrol",
                  "imagePath": "https://images.unsplash.com/photo-1535448580089-c7f9490c78b1?w=800&h=520&fit=crop&auto=format",
                  "tag": ""
                }
                """, Vehicle.class);

        assertNull(vehicle.getId());
        assertEquals("Ferrari", vehicle.getBrand());
        assertEquals("Roma", vehicle.getModel());
    }
}
