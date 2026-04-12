import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from '../core/api.service';
import { TranslationService } from '../core/translation.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
    cartItems: any[] = [];
    total: number = 0;

    constructor(
        private api: ApiService,
        public ts: TranslationService,
        private router: Router
    ) { }

    ngOnInit() {
        this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
        this.calculateTotal();
    }

    calculateTotal() {
        this.total = this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    }

    removeItem(index: number) {
        this.cartItems.splice(index, 1);
        this.updateCart();
    }

    updateCart() {
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
        this.calculateTotal();
    }

    checkout() {
        if (this.cartItems.length === 0) return;

        const token = localStorage.getItem('jwt_token');
        if (!token) {
            alert('Please login to checkout.');
            this.router.navigate(['/login']);
            return;
        }

        const orderData = {
            totalAmount: this.total,
            items: this.cartItems.map(i => ({
                productId: i.productId,
                quantity: i.quantity,
                priceAtTimeOfOrder: i.price
            }))
        };

        this.api.createOrder(orderData).subscribe({
            next: (res) => {
                alert('Order placed successfully! A confirmation email has been sent.');
                this.cartItems = [];
                this.updateCart();
                this.router.navigate(['/history']);
            },
            error: (err) => {
                alert('Checkout failed. Please ensure you are logged in.');
            }
        });
    }
}
