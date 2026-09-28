import { Component, signal } from '@angular/core';
import { ProductList } from '../product-list/product-list.component';
import { ArrowRight } from '../icon/arrow-right.component';
import { ChevronDown } from '../icon/chevron-down.component';
import { StarIcon } from '../icon/star-icon.component';
import { Footer } from '../footer/footer.component';
import { Header } from '../header/header.component';

@Component({
    selector: 'app-home',
    imports: [ProductList, ArrowRight, ChevronDown, StarIcon, Footer, Header],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class Home {
    readonly pickupDate = signal('');
    readonly returnDate = signal('');
    readonly location = signal('Makati - BGC / Ortigas');
    readonly activeTestimonial = signal(0);
    readonly bookingMessage = signal('');

    readonly locations = [
        { city: 'Makati', airport: 'BGC / Ortigas', count: 54, available: true },
        { city: 'Quezon City', airport: 'Eastwood / UP', count: 38, available: true },
        { city: 'Pasay', airport: 'NAIA Terminal 1-4', count: 47, available: true },
        { city: 'Taguig', airport: 'BGC / SM Aura', count: 31, available: true },
        { city: 'Cebu City', airport: 'Mactan-Cebu Intl.', count: 0, available: false },
        { city: 'Davao City', airport: 'Francisco Bangoy Intl.', count: 0, available: false },
    ];

    readonly testimonials = [
        {
            name: 'Rafael Santos',
            title: 'Managing Director, Archipelago Ventures',
            quote: 'The Rolls-Royce was flawless - picked up at NAIA, dropped off in BGC. This is exactly how executive travel should feel in Manila.',
        },
        {
            name: 'Andrea Reyes',
            title: 'Creative Director, Studio MNL',
            quote: 'Rented the HiAce for a team shoot in Batangas. Spacious, immaculate, on time. Veloce made the whole production seamless.',
        },
        {
            name: 'Miguel Lim',
            title: 'Founder, PH TechGroup',
            quote: 'Booked a Porsche 911 for a client dinner. Zero friction, pristine condition, professional handoff in Makati. Will not use anyone else.',
        },
    ];

    searchFleet(): void {
        this.bookingMessage.set(
            this.pickupDate() && this.returnDate()
                ? `Showing vehicles for ${this.location()}.`
                : 'Choose both dates to search the fleet.',
        );
    }

    setTestimonial(index: number): void {
        this.activeTestimonial.set(index);
    }
}
