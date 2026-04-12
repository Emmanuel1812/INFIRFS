import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../core/api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
    products: any[] = [];
    selectedProduct: any = {};
    isEditing = false;

    constructor(private api: ApiService, private router: Router) { }

    ngOnInit() {
        this.loadProducts();
    }

    loadProducts() {
        this.api.getProducts().subscribe(res => {
            this.products = res;
        });
    }

    editProduct(p: any) {
        this.selectedProduct = { ...p };
        this.isEditing = true;
    }

    deleteProduct(id: number) {
        if (confirm('Are you sure you want to delete this?')) {
            this.api.deleteProduct(id).subscribe({
                next: () => this.loadProducts(),
                error: () => alert('Failed! Are you an Admin?')
            });
        }
    }

    saveProduct() {
        if (this.isEditing) {
            this.api.updateProduct(this.selectedProduct.id, this.selectedProduct).subscribe({
                next: () => {
                    this.loadProducts();
                    this.cancelEdit();
                },
                error: () => alert('Failed to update! Are you an Admin?')
            });
        } else {
            this.api.createProduct(this.selectedProduct).subscribe({
                next: () => {
                    this.loadProducts();
                    this.cancelEdit();
                },
                error: () => alert('Failed to create! Are you an Admin?')
            });
        }
    }

    cancelEdit() {
        this.selectedProduct = {};
        this.isEditing = false;
    }
}
