import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-order',
  imports: [ReactiveFormsModule],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css',
})
export class CreateOrder {
  private readonly formBuilder = inject(FormBuilder);
  readonly submitted = signal(false);
  readonly orderForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    pickup: ['', Validators.required],
    returnDate: ['', Validators.required],
  });

  submit(): void {
    if (this.orderForm.invalid) { this.orderForm.markAllAsTouched(); return; }
    this.submitted.set(true);
  }
}
