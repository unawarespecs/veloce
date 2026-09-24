import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArrowRight } from '../../icon/arrow-right.component';
import { RenterService } from '../../service/renter.service';
import { CartService } from '../../service/cart.service';

@Component({
    selector: 'app-menu-bar',
    imports: [ArrowRight, RouterLink],
    templateUrl: './menu-bar.component.html',
    styleUrl: './menu-bar.component.css',
})
export class MenuBar {
    private readonly renterService = inject(RenterService);
    readonly cart = inject(CartService);

    readonly menuOpen = signal(false);
    readonly currentRenter = this.renterService.currentRenter;
    readonly isAuthenticated = this.renterService.isAuthenticated;

    closeMenu(): void {
        this.menuOpen.set(false);
    }

    signOut(): void {
        this.renterService.signOut();
        this.closeMenu();
    }
}
