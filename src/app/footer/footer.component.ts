import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './footer.component.css',
})
export class Footer {
    protected readonly Component = Component;

    readonly footerColumns = [
        {
            heading: 'Fleet',
            links: [
                { title: 'Sedans', href: '/fleet' },
                { title: 'Sports Cars', href: '/fleet'},
                { title: 'SUVs', href: '/fleet' },
                { title: 'Trucks', href: '/fleet' },
                { title: 'Luxury Vehicles', href: '/fleet' },
                { title: 'Vans', href: '/fleet' },
            ],
        },
        {
            heading: 'Company',
            links: [
                { title: 'About Us', href: '/#about' },
                { title: 'Careers', href: '/#about' },
                { title: 'Press', href: '/#about' },
                { title: 'Partner with Us', href: '/#about' },
                { title: 'Contact Us', href: '/#about' },
            ],
        },
        {
            heading: 'Support',
            links: [
                { title: 'Book a Car', href: '/#booking' },
                { title: 'Manage Reservations', href: '/orders' },
                { title: 'Insurance', href: '/' },
                { title: 'FAQ', href: '/' },
                { title: '24/7 Concierge', href: '/' },
            ],
        },
    ];
}
