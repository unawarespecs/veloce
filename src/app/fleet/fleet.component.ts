import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Header } from '../header/header.component';
import { Footer } from '../footer/footer.component';
import { ProductList } from '../product-list/product-list.component';

@Component({
    selector: 'app-fleet',
    imports: [Header, Footer, ProductList],
    templateUrl: './fleet.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './fleet.component.css',
})
export class Fleet {}
