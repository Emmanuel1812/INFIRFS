import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../core/api.service';
import { TranslationService } from '../core/translation.service';

@Component({
    selector: 'app-product-detail',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './product-detail.component.html',
    styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
    product: any;

    constructor(
        private route: ActivatedRoute,
        private api: ApiService,
        public ts: TranslationService
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.api.getProductById(+id).subscribe(res => {
                this.product = res;
            });
        }
    }

    addToCart() {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        let item = cart.find((i: any) => i.productId === this.product.id);
        if (item) {
            item.quantity += 1;
        } else {
            cart.push({
                productId: this.product.id,
                name: this.product.name,
                price: this.product.price,
                quantity: 1
            });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Added to cart!');
    }
}
