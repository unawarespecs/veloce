package io.github.unawarespecs.veloce.controller;

import io.github.unawarespecs.veloce.controller.storage.StorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/files")
public class FileController {
    Logger logger = LoggerFactory.getLogger(this.getClass());

    private final StorageService storageService;

    public FileController(StorageService storageService) {
        this.storageService = storageService;
    }

    @RequestMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadSingleFile(@RequestHeader Map<String, String> headers, @RequestParam("file") MultipartFile file) {
        logger.info("upload file: {}", file.getOriginalFilename());
        logger.info("upload contentType: {}", file.getContentType());
        logger.info("upload Name: {}", file.getName());

        for (String header : headers.values()) {
            logger.info("header: {}", header);
        }
        storageService.store(file);
        Map<String, String> map = new HashMap<>();
        map.put("fileName", file.getOriginalFilename());
        map.put("fileSize", Long.toString(file.getSize()));
        map.put("fileContentType", file.getContentType());
        map.put("message", "File upload done");
        return ResponseEntity.ok(map);
    }

    @RequestMapping(value = "/download/{name}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity<?> downloadSingleFile(@PathVariable(value = "name") String fileName) {
        Resource file = null;
        logger.info("downloadfile: {}", fileName);

        String basePath = "../upload-dir/";
        File dir = new File(basePath + fileName);
        logger.info("downloadfile: {{}} ", dir.toURI());
        try {
            if (dir.exists()) {
                file = new UrlResource(dir.toURI());
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage());
            System.err.println(ex.getMessage());
        }
        if (file == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_OCTET_STREAM).body(file);
        }
    }
}
