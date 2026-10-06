import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-star-icon',
    template: `<svg viewBox="0 0 14 14" aria-hidden="true">
        <path d="M7 1l1.5 4h4.2l-3.4 2.5 1.3 4L7 9.2 3.4 11.5l1.3-4L1.3 5H5.5z" />
    </svg>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    styles: `
        :host {
            display: inline-flex;
            width: 14px;
            height: 14px;
        }
        svg {
            width: 100%;
            height: 100%;
            fill: currentColor;
        }
    `,
})
export class StarIcon {}
