import { Component, input } from '@angular/core';

@Component({
    selector: 'app-chevron-down',
    template: `<svg
        [attr.width]="size()"
        [attr.height]="size()"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        aria-hidden="true"
    >
        <path d="M4 6l4 4 4-4" stroke-linecap="round" stroke-linejoin="round" />
    </svg>`,
    styles: `
        :host {
            display: inline-flex;
        }
    `,
})
export class ChevronDown {
    readonly size = input(16);
}
