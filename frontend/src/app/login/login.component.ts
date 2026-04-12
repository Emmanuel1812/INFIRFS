import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../core/api.service';
import { TranslationService } from '../core/translation.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    isLogin = true;

    // Login form
    email = '';
    password = '';

    // Register form
    firstName = '';
    lastName = '';
    regEmail = '';
    regPassword = '';

    constructor(private api: ApiService, private router: Router, public ts: TranslationService) { }

    toggleMode() {
        this.isLogin = !this.isLogin;
    }

    onSubmit(authForm: any) {
        if (authForm.invalid) {
            // prevent sending when form is invalid (Enter key etc.)
            console.warn('form invalid, aborting submit');
            return;
        }
        if (this.isLogin) {
            const payload = { email: this.email, password: this.password };
            console.log('login payload', payload);
            this.api.login(payload).subscribe({
                next: (res) => {
                    localStorage.setItem('jwt_token', res.token);
                    localStorage.setItem('user_role', res.role);
                    this.router.navigate(['/']);
                },
                error: (err) => {
                    alert('Login failed. Check credentials.');
                }
            });
        } else {
            const payload = {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.regEmail,
                password: this.regPassword
            };
            console.log('register payload', payload);
            this.api.register(payload).subscribe({
                next: (res) => {
                    localStorage.setItem('jwt_token', res.token);
                    localStorage.setItem('user_role', res.role);
                    this.router.navigate(['/']);
                },
                error: (err) => {
                    alert('Registration failed.');
                }
            });
        }
    }

    logout() {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user_role');
        alert('Logged out');
    }

    isLoggedIn() {
        return !!localStorage.getItem('jwt_token');
    }
}
