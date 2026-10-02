import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { OrderList } from './order-list.component';

describe('OrderList', () => {
    let component: OrderList;
    let fixture: ComponentFixture<OrderList>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [OrderList],
            providers: [provideRouter([]), provideHttpClient()],
        }).compileComponents();

        fixture = TestBed.createComponent(OrderList);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
