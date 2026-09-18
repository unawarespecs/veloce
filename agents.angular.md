# Veloce Car Rental AI Agent guide (Angular SPA Frontend)

This repository contains an Angular 21 single-page application frontend for a car rental storefront. Keep work aligned with its current architecture and conventions.

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

## Project-specific patterns

- Route names and titles are defined centrally in [src/app/app.routes.ts](src/app/app.routes.ts) and should stay consistent with the storefront flow: home, orders, cart, products, product detail
- Domain model objects live under [src/app/model](src/app/model) and should be typed explicitly; avoid loose `any` values
- Reuse the current service/component delegation pattern instead of introducing new app-wide state libraries
- Keep styling near the component, usually in the local `.component.css` file; avoid creating new global styling frameworks unless the feature clearly needs them
- If adding static images, prefer Angular image optimization patterns and keep them in the existing asset structure under [public/](public)

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
- API documentation: [docs/api](docs/api)
- Backend implementation (Java): [cardata](cardata), [sbrentms](sbrentms)

When working in this repo, keep the change scope small, follow the existing Angular 21 conventions, and prefer direct reuse of the established storefront patterns over introducing new abstractions.
