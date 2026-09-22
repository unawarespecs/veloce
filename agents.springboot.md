# Veloce Spring Boot guide (concise, project-focused)

This repository contains a Spring-based backend for a car rental storefront. Keep work aligned with its current architecture and conventions.

## Tech stack and environment

- **Runtime:** Java 17
- **Framework:** Spring Boot 4.1.0 (using Data JPA)
- **Build System:** Maven (use `./mvnw` if it exists, otherwise use the system’s installed mvn.)
- **Database:** MySQL 8.0+

## Core CLI commands

Always execute or verify code changes using these commands:

- **Build & Compile:** `mvn clean compile`
- **Run Tests:** `mvn test`
- **Run Locally:** `mvn -pl sbrentms spring-boot:run`

> **Module run note**: build the whole project where necessary (see Build & Compile above for command), but runtime command targets the sbrentms module.  
> Check any .env files or environment variables for database passwords (externalized in sbrentms application.yml) before running the server.  
> If the MySQL server is not running and the backend fails to launch with a `com.mysql.cj.jdbc.exceptions.CommunicationsException` or a `java.net.ConnectException`, inform the user.

## Architecture & Package structure

This is a Maven multi-module project (root `pom.xml`) with two modules:

- JPA entities, base models, data repositories, services, and other classes live in the `cardata` module.

- Spring controllers and service implementations live in the `sbrentms` module. This module depends on `cardata` and adds Spring Web, Data JPA, Actuator, MySQL runtime support, and testing dependencies.

Treat `cardata` as the data-layer contract. Avoid mixing UI/API concerns into JPA models.

Ensure dependencies flow in one direction: `Controller -> Service -> Repository`.

### Java packages

#### cardata

- `io.github.unawarespecs.veloce.repository` (Spring Data Repositories)
- `io.github.unawarespecs.veloce.entity` (Database Entities)
- `io.github.unawarespecs.veloce.model` (Base models)
- `io.github.unawarespecs.veloce.enums` (Enums for base models/entities)
- `io.github.unawarespecs.veloce.service` (Business Logic Interfaces)

#### sbrentms

- `io.github.unawarespecs.veloce.controller` (REST Endpoints, HTTP Mapping, Validations)
- `io.github.unawarespecs.veloce.serviceimpl` (Business Logic Implementations)

## Java & Spring conventions

- Keep classes small and focused; separate REST API contracts (DTOs/records), business logic (services), and persistence concerns (entities/repositories).
- Use Jakarta Validation annotations such as `@NotNull`, `@NotBlank`, and `@Valid` for request payloads and domain invariants.
- Prefer immutable DTOs/records for API payloads and avoid exposing JPA entities directly over HTTP.
- Use `@Transactional` only at the service layer for write operations and keep transaction boundaries as narrow as possible.
- Handle errors consistently with exception handlers and meaningful HTTP status codes; do not swallow exceptions.
- Follow Spring naming conventions for components: `@RestController`, `@Service`, `@Repository`, `@Entity`.
- Use repository queries and pagination for list endpoints instead of loading large result sets into memory.
- Favor small, testable methods and add focused Spring tests for controllers, services, and repository behavior.
- Keep configuration externalized in `application.properties` or `application.yml` and avoid hard-coded environment-specific values.

## Project-specific patterns

- Base models must have a Lombok `@Data` annotation to reduce boilerplate code for getters and setters.
- When creating a new JPA entity, create the base model first and copy all fields to the newly created entities.
- The newly created JPA entity must have the Lombok `@Getter`/`@Setter`, `@ToString`, and `@RequiredArgsConstructor` annotations to reduce boilerplate code.
- New JPA entities must have a `lastUpdated` and `created` field, of type `java.time.LocalDateTime`. Annotate those fields with Hibernate `@UpdateTimestamp` (for `lastUpdated`) / `@CreationTimestamp` (for `created`), and the Jackson `@JsonFormat` as well.

The base model structure should look similar to this:

```java
@Data
public class ExampleEntity {
    private int id;

    // fields go here
}
```

The JPA entity structure should look similar to this:

```java
// Lombok annotations go here (@Getter/@Setter, @ToString, etc.)
@Entity
@Table(name = "example_entities") // Use snake_case for table naming.
public class ExampleEntityData {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Integer id;

    // fields from the base model

    @UpdateTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+08:00")
    private LocalDateTime lastUpdated;

    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+08:00")
    private LocalDateTime created;
}
```

Additionally, create a data repository class as well, extending the Spring Data `CrudRepository` class (`org.springframework.data.repository.CrudRepository`):

```java
public interface ExampleEntityDataRepository extends CrudRepository<ExampleEntityData, Integer> {
}
```

Lastly, create a service interface for CRUD operations.

```java
public interface ExampleEntityService {
    ExampleEntity[] getAll() throws Exception;
    ExampleEntity get(Integer id) throws Exception;
    ExampleEntity create(ExampleEntity entity) throws Exception;
    ExampleEntity update(ExampleEntity entity) throws Exception;
    void delete(Integer id) throws Exception;
}
```

To summarize, creation of a new entity class starts with making a `base model` -> `JPA entity` -> `data repository` -> `service interface`.

## Quick do/don't checklist for agents

- Do: follow module boundaries (edit implementations in sbrentms, update contracts in cardata only when intentionally changing the data model).
- Do: mirror manual mapping conventions or add a single, repo-wide mapper if adding many mappings (document it).
- Don't: assume DTOs equal entities — code explicitly maps between them.
- Do: handle null returns from services and convert to proper HTTP statuses in controllers.

## Helpful references

- Project overview: [README.md](README.md)
- API documentation: [docs/api](docs/api)

When working in this repo, keep the change scope small, follow existing Java and Spring conventions, and prefer direct reuse of the established storefront patterns over introducing new abstractions.
