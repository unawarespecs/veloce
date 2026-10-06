import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TitleBar } from './title-bar/title-bar.component';
import { MenuBar } from './menu-bar/menu-bar.component';

@Component({
    selector: 'app-header',
    imports: [TitleBar, MenuBar],
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './header.component.css',
})
export class Header {}
