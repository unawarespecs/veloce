import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { CartItems } from './cart-items.component';

describe('CartItems', () => {
    let component: CartItems;
    let fixture: ComponentFixture<CartItems>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CartItems],
            providers: [provideRouter([]), provideHttpClient()],
        }).compileComponents();

        fixture = TestBed.createComponent(CartItems);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
