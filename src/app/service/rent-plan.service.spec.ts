import { TestBed } from '@angular/core/testing';

import { RentPlanService } from './rent-plan.service';

describe('RentPlan', () => {
    let service: RentPlanService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(RentPlanService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
