import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { ProductDetails } from './product-details.component';
import { Vehicle } from '../model/product';
import { CartService } from '../service/cart.service';
import { provideRouter } from '@angular/router';

describe('ProductDetails', () => {
    let component: ProductDetails;
    let componentRef: ComponentRef<ProductDetails>;
    let fixture: ComponentFixture<ProductDetails>;
    let cartService: CartService;

    const mockVehicle: Vehicle = {
        id: 1,
        name: 'Test Supercar',
        category: 'Sports',
        price: 15000,
        seats: 2,
        transmission: 'Automatic',
        fuel: 'Petrol',
        image: 'test.jpg',
        tag: 'Exotic',
        description: 'A breathtaking high-performance sports car with unmatched speed.',
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProductDetails],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(ProductDetails);
        component = fixture.componentInstance;
        componentRef = fixture.componentRef;
        cartService = TestBed.inject(CartService);

        componentRef.setInput('vehicle', mockVehicle);
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display vehicle details including name, seats, transmission, fuel, price, and description', () => {
        const nativeElement: HTMLElement = fixture.nativeElement;

        expect(nativeElement.textContent).toContain('Test Supercar');
        expect(nativeElement.textContent).toContain('2 Seats');
        expect(nativeElement.textContent).toContain('Automatic');
        expect(nativeElement.textContent).toContain('Petrol');
        expect(nativeElement.textContent).toContain('15,000');
        expect(nativeElement.textContent).toContain('A breathtaking high-performance sports car with unmatched speed.');
    });

    it('should emit close event when close button is clicked', () => {
        let closed = false;
        component.close.subscribe(() => {
            closed = true;
        });

        const closeBtn = fixture.nativeElement.querySelector('.modal-close') as HTMLButtonElement;
        closeBtn.click();

        expect(closed).toBe(true);
    });

    it('should emit reserve event and add vehicle to cart when reserve button is clicked', () => {
        let reservedVehicle: Vehicle | null = null;
        component.reserve.subscribe((v) => {
            reservedVehicle = v;
        });

        const reserveBtn = fixture.nativeElement.querySelector('.reserve-button') as HTMLButtonElement;
        reserveBtn.click();

        expect(reservedVehicle).toEqual(mockVehicle);
        expect(cartService.count()).toBe(1);
    });
});
