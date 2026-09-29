# Veloce Backend API Reference

This document describes the backend endpoints exposed by the Spring Boot application for vehicle rentals, renter management, and rent plan management.

## Base URL and CORS

- API endpoints are exposed under:
    - `/api/rentplan`
    - `/api/renter`
    - `/api/vehicle`
- CORS is configured to allow requests from `http://localhost:4200`.
- Successful requests generally return `200 OK` with the created/updated entity or array in the response body.
- Exceptions are returned as `500 Internal Server Error` with the exception object or message in the response body.

---

## Shared response conventions

### Success

- `200 OK` for list, get, create, update, and delete operations where the operation completes without exception.
- Response body contains either:
    - an array of entities for list endpoints
    - a single entity for get/create/update endpoints
    - `null` for delete endpoints

### Errors

- `500 Internal Server Error` is returned when the controller catches an exception.
- Error body is typically either:
    - the exception instance itself
    - `e.getMessage()`

---

## Resource models

### RentPlan

```json
{
    "id": 1,
    "renterID": 10,
    "vehicleID": 3,
    "startRent": "2026-09-25T00:00:00.000Z",
    "endRent": "2026-09-30T00:00:00.000Z",
    "daysRent": 5,
    "totalPrice": 2500.0,
    "customerName": "Jane Doe",
    "payMode": "Cash"
}
```

Allowed payment values:

- `Cash`
- `Credit`
- `Debit`
- `GCash`
- `Maya`
- `QRPH`

### Renter

```json
{
    "id": 1,
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "secret123",
    "rentPlanID": 10,
    "rentedVehicleID": 3,
    "vehicleName": "Toyota Vios"
}
```

### Vehicle

```json
{
    "id": 1,
    "brand": "Toyota",
    "model": "Vios",
    "price": 1200000.0,
    "name": "Toyota Vios",
    "description": "Compact sedan for city drives",
    "category": "Sedan",
    "dailyRate": 1800.0,
    "seats": 5,
    "transmission": "Automatic",
    "fuel": "Petrol",
    "imagePath": "/images/toyota-vios.jpg",
    "tag": "Popular"
}
```

Vehicle enumerations:

- `category`: `Sedan`, `Van`, `SUV`, `Truck`, `Sports`, `Luxury`
- `transmission`: `Automatic`, `Manual`
- `fuel`: `Petrol`, `Diesel`, `Electric`, `Hybrid`

> Note: the `price` field is considered internal business data and is intentionally not meant for display on the frontend.

---

## 1) Rent Plan API

Base path: `/api/rentplan`

### GET /api/rentplan

Returns all rent plans.

#### Example

```http
GET /api/rentplan
```

#### Response

```json
[
    {
        "id": 1,
        "renterID": 10,
        "vehicleID": 3,
        "startRent": "2026-09-25T00:00:00.000Z",
        "endRent": "2026-09-30T00:00:00.000Z",
        "daysRent": 5,
        "totalPrice": 2500.0,
        "customerName": "Jane Doe",
        "payMode": "Cash",
        "status": "Pending"
    }
]
```

Rent plan enumerations:

- `status`: `Pending`, `Rented`, `Complete`, `Cancelled`, `Unknown`

### GET /api/rentplan/{id}

Returns a single rent plan by ID.

#### Example

```http
GET /api/rentplan/1
```

#### Response

```json
{
    "id": 1,
    "renterID": 10,
    "vehicleID": 3,
    "startRent": "2026-09-25T00:00:00.000Z",
    "endRent": "2026-09-30T00:00:00.000Z",
    "daysRent": 5,
    "totalPrice": 2500.0,
    "customerName": "Jane Doe",
    "payMode": "Cash"
}
```

### POST /api/rentplan

Creates a new rent plan.

#### Request body

```json
{
    "renterID": 10,
    "vehicleID": 3,
    "startRent": "2026-09-25T00:00:00.000Z",
    "endRent": "2026-09-30T00:00:00.000Z",
    "daysRent": 5,
    "totalPrice": 2500.0,
    "customerName": "Jane Doe",
    "payMode": "Cash"
}
```

#### Response

Returns the saved `RentPlan` object with its generated `id`.

### PUT /api/rentplan

Updates an existing rent plan.

#### Request body

```json
{
    "id": 1,
    "renterID": 10,
    "vehicleID": 3,
    "startRent": "2026-09-25T00:00:00.000Z",
    "endRent": "2026-10-02T00:00:00.000Z",
    "daysRent": 7,
    "totalPrice": 3500.0,
    "customerName": "Jane Doe",
    "payMode": "Credit"
}
```

Only non-null fields are updated in the persisted record.

### DELETE /api/rentplan/{id}

Deletes a rent plan by ID.

#### Example

```http
DELETE /api/rentplan/1
```

#### Response

- `200 OK`
- body: `null`

---

## 2) Renter API

Base path: `/api/renter`

### GET /api/renter

Returns all renters.

#### Example

```http
GET /api/renter
```

#### Response

```json
[
    {
        "id": 1,
        "name": "Jane Doe",
        "email": "jane@example.com",
        "password": "secret123",
        "rentPlanID": 10,
        "rentedVehicleID": 3,
        "vehicleName": "Toyota Vios"
    }
]
```

### GET /api/renter/{id}

Returns a single renter by ID.

### POST /api/renter

Creates a new renter.

#### Request body

```json
{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "secret123",
    "rentPlanID": 10,
    "rentedVehicleID": 3,
    "vehicleName": "Toyota Vios"
}
```

#### Response

Returns the saved renter with the generated `id`.

### PUT /api/renter

Updates an existing renter.

#### Request body

```json
{
    "id": 1,
    "name": "Jane Smith",
    "email": "jane.new@example.com",
    "password": "new-secret",
    "rentPlanID": 11,
    "rentedVehicleID": 5,
    "vehicleName": "Honda Civic"
}
```

Only non-null fields are updated.

### DELETE /api/renter/{id}

Deletes a renter by ID.

#### Example

```http
DELETE /api/renter/1
```

#### Response

- `200 OK`
- body: `null`

### DELETE /api/renter/{id}/rental

Clears the renter’s rental-related fields (`rentPlanID`, `rentedVehicleID`, and `vehicleName`).

#### Example

```http
DELETE /api/renter/1/rental
```

#### Response

```json
{
    "id": 1,
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "secret123",
    "rentPlanID": null,
    "rentedVehicleID": null,
    "vehicleName": null
}
```

---

## 3) Vehicle API

Base path: `/api/vehicle`

### GET /api/vehicle

Returns all vehicles.

#### Example

```http
GET /api/vehicle
```

#### Response

```json
[
    {
        "id": 1,
        "brand": "Toyota",
        "model": "Vios",
        "price": 1200000.0,
        "name": "Toyota Vios",
        "description": "Compact sedan for city drives",
        "category": "Sedan",
        "dailyRate": 1800.0,
        "seats": 5,
        "transmission": "Automatic",
        "fuel": "Petrol",
        "imagePath": "/images/toyota-vios.jpg",
        "tag": "Popular"
    }
]
```

### GET /api/vehicle/{id}

Returns one vehicle by ID.

### POST /api/vehicle

Creates a new vehicle.

#### Request body

```json
{
    "brand": "Toyota",
    "model": "Vios",
    "price": 1200000.0,
    "name": "Toyota Vios",
    "description": "Compact sedan for city drives",
    "category": "Sedan",
    "dailyRate": 1800.0,
    "seats": 5,
    "transmission": "Automatic",
    "fuel": "Petrol",
    "imagePath": "/images/toyota-vios.jpg",
    "tag": "Popular"
}
```

#### Response

Returns the saved vehicle with its generated `id`.

### PUT /api/vehicle

Updates an existing vehicle.

#### Request body

```json
{
    "id": 1,
    "brand": "Toyota",
    "model": "Vios",
    "price": 1250000.0,
    "name": "Toyota Vios",
    "description": "Updated compact sedan",
    "category": "Sedan",
    "dailyRate": 2000.0,
    "seats": 5,
    "transmission": "Automatic",
    "fuel": "Hybrid",
    "imagePath": "/images/toyota-vios.jpg",
    "tag": "Featured"
}
```

Only non-null fields are updated.

### DELETE /api/vehicle/{id}

Deletes a vehicle by ID.

#### Example

```http
DELETE /api/vehicle/1
```

#### Response

- `200 OK`
- body: `null`

---

## Notes

- The controllers use `@RestController` and return `ResponseEntity<?>` values.
- All three resource controllers are annotated with `@CrossOrigin(origins = "http://localhost:4200")`.
- This API is designed for the Angular frontend running on the local development server at `http://localhost:4200`.
