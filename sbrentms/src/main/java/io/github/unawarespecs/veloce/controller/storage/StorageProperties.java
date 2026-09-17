package io.github.unawarespecs.veloce.controller.storage;


import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@Setter
@Getter
@ConfigurationProperties("file.upload")
@ConfigurationPropertiesScan
public class StorageProperties {

    /**
     * Folder location for storing files
     */
    private String location;

}