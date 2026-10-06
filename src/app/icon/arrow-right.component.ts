import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-arrow-right',
    template: `<svg
        [attr.width]="size()"
        [attr.height]="size()"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        aria-hidden="true"
    >
        <path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round" />
    </svg>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    styles: `
        :host {
            display: inline-flex;
        }
    `,
})
export class ArrowRight {
    readonly size = input(16);
}
