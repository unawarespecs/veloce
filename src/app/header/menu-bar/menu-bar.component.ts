import { Component, signal } from '@angular/core';
import { ArrowRight } from '../../icon/arrow-right.component';

@Component({
    selector: 'app-menu-bar',
    imports: [ArrowRight],
    templateUrl: './menu-bar.component.html',
    styleUrl: './menu-bar.component.css',
})
export class MenuBar {
    readonly menuOpen = signal(false);

    closeMenu(): void {
        this.menuOpen.set(false);
    }
}
