import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsStandalone } from './product-details-standalone.component';

describe('ProductDetailsStandalone', () => {
    let component: ProductDetailsStandalone;
    let fixture: ComponentFixture<ProductDetailsStandalone>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProductDetailsStandalone],
        }).compileComponents();

        fixture = TestBed.createComponent(ProductDetailsStandalone);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
