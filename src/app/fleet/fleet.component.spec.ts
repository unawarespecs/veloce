import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { Fleet } from './fleet.component';

describe('Fleet', () => {
    let component: Fleet;
    let fixture: ComponentFixture<Fleet>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Fleet],
            providers: [provideRouter([]), provideHttpClient()],
        }).compileComponents();

        fixture = TestBed.createComponent(Fleet);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
