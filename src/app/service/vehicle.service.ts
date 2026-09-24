import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Vehicle } from '../model/vehicle';
import { environment } from '../../environments/environment';

export type FleetStatus = 'loading' | 'loaded' | 'error';
@Injectable({
    providedIn: 'root',
})
export class VehicleService {
    private API_BASE_URL = environment.apiBaseUrl;
    private readonly http = inject(HttpClient);
    private readonly fleetSignal = signal<Vehicle[]>([]);
    private readonly fleetStatusSignal = signal<FleetStatus>('loading');
    private readonly selectedVehicleSignal = signal<Vehicle | null>(null);
    readonly fleet = this.fleetSignal.asReadonly();
    readonly fleetStatus = this.fleetStatusSignal.asReadonly();
    readonly selectedVehicle = this.selectedVehicleSignal.asReadonly();

    constructor() {
        this.http.get<Vehicle[]>(`${this.API_BASE_URL}/api/vehicle/`).subscribe({
            next: (vehicles) => {
                console.log(vehicles);
                this.fleetSignal.set(vehicles);
                this.fleetStatusSignal.set('loaded');
            },
            error: (error: unknown) => {
                console.error('Failed to load vehicles', error);
                this.fleetStatusSignal.set('error');
            },
        });
    }

    getFleet(): Vehicle[] {
        return this.fleetSignal();
    }

    getVehicleById(id: number): Vehicle | undefined {
        return this.fleetSignal().find((vehicle) => vehicle.id === id);
    }

    setSelectedVehicle(vehicle: Vehicle | null): void {
        this.selectedVehicleSignal.set(vehicle);
    }
}
