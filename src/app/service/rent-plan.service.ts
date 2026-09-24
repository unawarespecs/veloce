import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RentPlan } from '../model/rent-plan';

@Injectable({
    providedIn: 'root',
})
export class RentPlanService {
    private readonly API_BASE_URL = environment.apiBaseUrl;
    private readonly http = inject(HttpClient);

    getRentPlans(): Observable<RentPlan[]> {
        return this.http.get<RentPlan[]>(`${this.API_BASE_URL}/api/rentplan/`);
    }

    getRentPlanById(id: number): Observable<RentPlan> {
        return this.http.get<RentPlan>(`${this.API_BASE_URL}/api/rentplan/${id}`);
    }

    createRentPlan(rentPlan: RentPlan): Observable<RentPlan> {
        return this.http.post<RentPlan>(`${this.API_BASE_URL}/api/rentplan/`, rentPlan);
    }

    updateRentPlan(rentPlan: RentPlan): Observable<RentPlan> {
        return this.http.put<RentPlan>(`${this.API_BASE_URL}/api/rentplan/`, rentPlan);
    }

    deleteRentPlan(id: number): Observable<void> {
        return this.http.delete<void>(`${this.API_BASE_URL}/api/rentplan/${id}`);
    }
}
