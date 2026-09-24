import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, map, of, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Renter } from '../model/renter';

const CURRENT_RENTER_STORAGE_KEY = 'veloce_current_renter';

@Injectable({
  providedIn: 'root',
})
export class RenterService {
  private readonly API_BASE_URL = environment.apiBaseUrl;
  private readonly http = inject(HttpClient);

  private readonly currentRenterSignal = signal<Renter | null>(this.loadStoredRenter());
  readonly currentRenter = this.currentRenterSignal.asReadonly();
  readonly isAuthenticated = computed(() => !!this.currentRenterSignal());

  private loadStoredRenter(): Renter | null {
    try {
      const stored = localStorage.getItem(CURRENT_RENTER_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  private saveCurrentRenter(renter: Renter | null): void {
    this.currentRenterSignal.set(renter);
    if (renter) {
      localStorage.setItem(CURRENT_RENTER_STORAGE_KEY, JSON.stringify(renter));
    } else {
      localStorage.removeItem(CURRENT_RENTER_STORAGE_KEY);
    }
  }

  getRenters(): Observable<Renter[]> {
    return this.http.get<Renter[]>(`${this.API_BASE_URL}/api/renter/`);
  }

  getRenterById(id: number): Observable<Renter> {
    return this.http.get<Renter>(`${this.API_BASE_URL}/api/renter/${id}`);
  }

  createRenter(renter: Omit<Renter, 'id'> | Renter): Observable<Renter> {
    return this.http.post<Renter>(`${this.API_BASE_URL}/api/renter/`, renter);
  }

  updateRenter(renter: Partial<Renter> & { id: number }): Observable<Renter> {
    return this.http.put<Renter>(`${this.API_BASE_URL}/api/renter/`, renter).pipe(
      tap((updated) => {
        const current = this.currentRenterSignal();
        if (current && current.id === updated.id) {
          this.saveCurrentRenter({ ...current, ...updated });
        }
      })
    );
  }

  clearRentalDetails(id: number): Observable<Renter> {
    return this.http.delete<Renter>(`${this.API_BASE_URL}/api/renter/${id}/rental`).pipe(
      tap((updated) => {
        const current = this.currentRenterSignal();
        if (current && current.id === updated.id) {
          this.saveCurrentRenter({ ...current, ...updated });
        }
      })
    );
  }

  signIn(email: string, password: string): Observable<Renter> {
    return this.getRenters().pipe(
      map((renters) => {
        const found = renters.find(
          (r) => r.email?.toLowerCase() === email.trim().toLowerCase() && r.password === password
        );
        if (!found) {
          throw new Error('Invalid email or password');
        }
        return found;
      }),
      tap((renter) => this.saveCurrentRenter(renter))
    );
  }

  signUp(renterData: Omit<Renter, 'id'>): Observable<Renter> {
    return this.createRenter(renterData).pipe(
      tap((created) => this.saveCurrentRenter(created))
    );
  }

  signOut(): void {
    this.saveCurrentRenter(null);
  }
}
