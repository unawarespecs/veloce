package io.github.unawarespecs.veloce;

import io.github.unawarespecs.veloce.controller.storage.StorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
public class CarRentalServerApp {
    public static void main(String[] args)
    {
        SpringApplication.run(CarRentalServerApp.class, args);

    }
}
