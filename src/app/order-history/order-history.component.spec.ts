import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderHistory, OrderHistoryItem } from './order-history.component';
import { RentPlanStatus } from '../model/rent-plan-status';

describe('OrderHistory', () => {
    let component: OrderHistory;
    let fixture: ComponentFixture<OrderHistory>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [OrderHistory],
        }).compileComponents();

        fixture = TestBed.createComponent(OrderHistory);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display empty state when history is empty', async () => {
        fixture.componentRef.setInput('history', []);
        fixture.detectChanges();
        await fixture.whenStable();

        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.textContent).toContain('No past rental history found.');
    });

    it('should display loading state when isLoading is true', async () => {
        fixture.componentRef.setInput('isLoading', true);
        fixture.detectChanges();
        await fixture.whenStable();

        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.textContent).toContain('Loading your rental history...');
    });

    it('should render history items when provided', async () => {
        const mockItems: OrderHistoryItem[] = [
            {
                plan: {
                    id: 10,
                    renterID: 1,
                    vehicleID: 2,
                    startRent: '2026-10-01',
                    endRent: '2026-10-04',
                    daysRent: 3,
                    totalPrice: 13050,
                    customerName: 'John Doe',
                    payMode: 'Cash',
                    status: RentPlanStatus.Cancelled,
                },
                vehicleName: 'Mitsubishi Montero Sport (2026)',
                vehicleImage: 'img/mitsubishi-montero-sport.jpg',
            },
        ];

        fixture.componentRef.setInput('history', mockItems);
        fixture.detectChanges();
        await fixture.whenStable();

        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.textContent).toContain('Mitsubishi Montero Sport (2026)');
        expect(compiled.textContent).toContain('Status: Cancelled');
        expect(compiled.textContent).toContain('Payment: Cash');
        expect(compiled.querySelector('.status-cancelled')).toBeTruthy();
    });
});
