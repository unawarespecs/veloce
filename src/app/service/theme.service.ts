import { Injectable, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    private readonly THEME_KEY = 'veloce-theme';
    readonly currentTheme = signal<Theme>(this.getInitialTheme());

    constructor() {
        this.applyTheme(this.currentTheme());
    }

    toggleTheme(): void {
        const nextTheme: Theme = this.currentTheme() === 'dark' ? 'light' : 'dark';
        this.setTheme(nextTheme);
    }

    setTheme(theme: Theme): void {
        this.currentTheme.set(theme);
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(this.THEME_KEY, theme);
        }
        this.applyTheme(theme);
    }

    private getInitialTheme(): Theme {
        if (typeof localStorage !== 'undefined') {
            const saved = localStorage.getItem(this.THEME_KEY) as Theme;
            if (saved === 'light' || saved === 'dark') {
                return saved;
            }
        }
        return 'dark';
    }

    private applyTheme(theme: Theme): void {
        if (typeof document !== 'undefined') {
            document.documentElement.setAttribute('data-theme', theme);
        }
    }
}
