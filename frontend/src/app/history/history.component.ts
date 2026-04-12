import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../core/api.service';
import { TranslationService } from '../core/translation.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-history',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './history.component.html',
    styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit {
    orders: any[] = [];

    constructor(
        private api: ApiService,
        public ts: TranslationService,
        private router: Router
    ) { }

    ngOnInit() {
        const token = localStorage.getItem('jwt_token');
        if (!token) {
            this.router.navigate(['/login']);
            return;
        }

        this.api.getUserOrders().subscribe({
            next: (res) => {
                this.orders = res;
            },
            error: () => {
                alert('Could not load orders.');
            }
        });
    }
}
