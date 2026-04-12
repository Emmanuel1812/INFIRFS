import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../core/api.service';
import { TranslationService } from '../core/translation.service';

@Component({
    selector: 'app-catalog',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './catalog.component.html',
    styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit {
    products: any[] = [];
    searchQuery: string = '';

    constructor(private api: ApiService, public ts: TranslationService) { }

    ngOnInit() {
        this.loadProducts();
    }

    loadProducts() {
        this.api.getProducts().subscribe(res => {
            this.products = res;
        });
    }

    onSearch() {
        if (this.searchQuery.trim()) {
            this.api.searchProducts(this.searchQuery).subscribe(res => {
                this.products = res;
            });
        } else {
            this.loadProducts();
        }
    }
}
