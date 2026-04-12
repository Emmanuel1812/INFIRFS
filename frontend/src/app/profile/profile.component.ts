import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../core/api.service';
import { TranslationService } from '../core/translation.service';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
    user: any = { firstName: '', lastName: '', email: '' };
    message: string = '';
    isError: boolean = false;

    constructor(private api: ApiService, public ts: TranslationService) { }

    ngOnInit() {
        this.api.getProfile().subscribe({
            next: (res) => this.user = res,
            error: () => { this.message = 'Error loading profile. Are you logged in?'; this.isError = true; }
        });
    }

    onSave() {
        if (!this.user.firstName || !this.user.lastName) {
            this.message = 'First and last name are required.';
            this.isError = true;
            return;
        }

        this.api.updateProfile({ firstName: this.user.firstName, lastName: this.user.lastName }).subscribe({
            next: (res) => {
                this.user = res;
                this.message = 'Profile updated successfully!';
                this.isError = false;
            },
            error: () => {
                this.message = 'Failed to update profile. Please try again.';
                this.isError = true;
            }
        });
    }
}
