import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
    let service: ThemeService;

    beforeEach(() => {
        localStorage.clear();
        document.documentElement.removeAttribute('data-theme');
        TestBed.configureTestingModule({});
        service = TestBed.inject(ThemeService);
    });

    afterEach(() => {
        localStorage.clear();
        document.documentElement.removeAttribute('data-theme');
    });

    it('should be created with dark theme by default', () => {
        expect(service).toBeTruthy();
        expect(service.currentTheme()).toBe('dark');
        expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('should toggle theme between dark and light', () => {
        service.toggleTheme();
        expect(service.currentTheme()).toBe('light');
        expect(document.documentElement.getAttribute('data-theme')).toBe('light');
        expect(localStorage.getItem('veloce-theme')).toBe('light');

        service.toggleTheme();
        expect(service.currentTheme()).toBe('dark');
        expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
        expect(localStorage.getItem('veloce-theme')).toBe('dark');
    });

    it('should set theme explicitly', () => {
        service.setTheme('light');
        expect(service.currentTheme()).toBe('light');
        expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });
});
