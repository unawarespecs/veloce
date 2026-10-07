import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MenuBar } from './menu-bar.component';

describe('MenuBar', () => {
    let component: MenuBar;
    let fixture: ComponentFixture<MenuBar>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MenuBar],
            providers: [provideRouter([]), provideHttpClient()],
        }).compileComponents();

        fixture = TestBed.createComponent(MenuBar);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle theme when toggleTheme is called', () => {
        expect(component.currentTheme()).toBe('dark');
        component.toggleTheme();
        expect(component.currentTheme()).toBe('light');
        component.toggleTheme();
        expect(component.currentTheme()).toBe('dark');
    });
});
