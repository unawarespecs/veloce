
# Veloce Car Rental AI agent guide

This repository is an Angular 21 single-page application for a car rental storefront. Keep work aligned with its current architecture and conventions.

## Project structure

- App entry: [src/main.ts](src/main.ts), root shell: [src/app/app.component.ts](src/app/app.component.ts), route config: [src/app/app.routes.ts](src/app/app.routes.ts)
- Feature components live under [src/app](src/app), grouped by domain area such as `product-list`, `cart`, `order-list`, `header`, and `sign-in`
- Shared models belong in [src/app/model](src/app/model), and injectable services belong in [src/app/service](src/app/service)
- Use the existing domain naming conventions: `*.component.ts`, `*.service.ts`, and `*.spec.ts`
- Prefer small, focused feature components and keep route-level logic in the relevant feature folder

## Angular conventions

- This app uses Angular 21 standalone components. Do not introduce NgModules for new features unless the codebase already requires them
- Keep `standalone` default behavior; do not add `standalone: true` to component decorators
- Prefer `input()` and `output()` over decorator-based inputs/outputs
- Prefer signals for local state and `computed()` for derived values; do not mutate signals directly
- Prefer native control flow in templates: `@if`, `@for`, `@switch` instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use `ChangeDetectionStrategy.OnPush` in component decorators when the component is stateful or value-driven
- Put host bindings in the `host` object of the decorator instead of `@HostBinding` or `@HostListener`
- Keep templates simple and avoid complex logic inside them
- Use `inject()` for service access when it matches the app’s existing patterns
- Use `providedIn: 'root'` for singleton services; keep services focused on one responsibility

## Java backend (Spring Boot)

- The Java backend lives in the `sbrentms` module and runs on Spring Boot 4.1.0 with Java 17.
- The persistence model and JPA entities live in the `cardata` module; this module includes `spring-boot-starter-data-jpa`, `jakarta.persistence-api`, `mysql-connector-j`, and Jackson annotations.
- The server module `sbrentms` depends on `cardata` and adds Spring Web, Data JPA, Actuator, MySQL runtime support, and testing dependencies. The root parent POM is the Spring Boot parent and sets Java 17 compilation.
- Keep backend code organized by feature and responsibility: controllers, services, repositories, DTOs, and domain/entity classes need clear package boundaries.
- Treat `cardata` as the data-layer contract: entities and persistence types should live there; avoid mixing UI/API concerns into JPA models.
- Prefer Spring Data repositories and service-layer orchestration over direct repository calls from controllers.

## Project-specific patterns

- Route names and titles are defined centrally in [src/app/app.routes.ts](src/app/app.routes.ts) and should stay consistent with the storefront flow: home, orders, cart, products, product detail
- Domain model objects live under [src/app/model](src/app/model) and should be typed explicitly; avoid loose `any` values
- Reuse the current service/component delegation pattern instead of introducing new app-wide state libraries
- Keep styling near the component, usually in the local `.component.css` file; avoid creating new global styling frameworks unless the feature clearly needs them
- If adding static images, prefer Angular image optimization patterns and keep them in the existing asset structure under [src/assets](src/assets)

## Useful Java coding practices

- Use constructor injection and `final` fields; prefer explicit dependencies over field injection.
- Keep classes small and focused; separate REST API contracts (DTOs/records), business logic (services), and persistence concerns (entities/repositories).
- Use Jakarta Validation annotations such as `@NotNull`, `@NotBlank`, and `@Valid` for request payloads and domain invariants.
- Prefer immutable DTOs/records for API payloads and avoid exposing JPA entities directly over HTTP.
- Use `@Transactional` only at the service layer for write operations and keep transaction boundaries as narrow as possible.
- Handle errors consistently with exception handlers and meaningful HTTP status codes; do not swallow exceptions.
- Follow Spring naming conventions for components: `@RestController`, `@Service`, `@Repository`, `@Entity`.
- Use repository queries and pagination for list endpoints instead of loading large result sets into memory.
- Favor small, testable methods and add focused Spring tests for controllers, services, and repository behavior.
- Keep configuration externalized in `application.properties` or `application.yml` and avoid hard-coded environment-specific values.

## Accessibility and quality

- Ensure new UI is keyboard-accessible and maintains reasonable focus management
- Use semantic HTML and accessible labels; do not add empty or misleading ARIA without need
- Avoid `ngClass` and `ngStyle`; use class and style bindings instead
- Keep forms typed and explicit; prefer reactive patterns when adding validation-heavy forms
- Follow WCAG AA basics for contrast and focus states

## Validation

- Primary build check: `npm run build`
- Test command: `npm test -- --watch=false` (or the project’s equivalent non-watch test run when needed)
- Prefer the smallest relevant validation for the change you are making; do not broaden the scope of a fix unnecessarily

## Helpful references

- Project overview: [README.md](README.md)
- Route configuration: [src/app/app.routes.ts](src/app/app.routes.ts)
- App shell: [src/app/app.component.ts](src/app/app.component.ts)
- Models: [src/app/model](src/app/model)
- Services: [src/app/service](src/app/service)

When working in this repo, keep change scope small, follow the existing Angular 21 conventions, and prefer direct reuse of the established storefront patterns over introducing new abstractions.
