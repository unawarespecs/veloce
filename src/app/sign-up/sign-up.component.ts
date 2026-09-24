import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RenterService } from '../service/renter.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUp {
  private readonly renterService = inject(RenterService);
  private readonly router = inject(Router);

  readonly name = signal('');
  readonly email = signal('');
  readonly password = signal('');
  readonly confirmPassword = signal('');

  readonly errorMessage = signal('');
  readonly isLoading = signal(false);

  onSubmit(): void {
    const nameVal = this.name().trim();
    const emailVal = this.email().trim();
    const passVal = this.password();
    const confirmPassVal = this.confirmPassword();

    if (!nameVal || !emailVal || !passVal || !confirmPassVal) {
      this.errorMessage.set('Please fill out all fields.');
      return;
    }

    if (passVal !== confirmPassVal) {
      this.errorMessage.set('Passwords do not match.');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.renterService
      .signUp({
        name: nameVal,
        email: emailVal,
        password: passVal,
        rentPlanID: '',
        rentedVehicleID: '',
        vehicleName: '',
      })
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.errorMessage.set(err?.message || 'Failed to create account. Please try again.');
        },
      });
  }
}
