import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private apiUrl = window.location.hostname === 'localhost' 
        ? 'http://localhost:8080/api' 
        : 'https://backend-webshop-emmanuel.onrender.com/api';

    constructor(private http: HttpClient) { }

    register(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/register`, data);
    }

    login(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/login`, data);
    }

    getProfile(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/users/profile`);
    }

    updateProfile(data: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/users/profile`, data);
    }

    getProducts(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/products`);
    }

    getProductById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/products/${id}`);
    }

    searchProducts(query: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/products/search?q=${query}`);
    }

    createProduct(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/products`, data);
    }

    updateProduct(id: number, data: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/products/${id}`, data);
    }

    deleteProduct(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/products/${id}`);
    }

    createOrder(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/orders`, data);
    }

    getUserOrders(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/orders`);
    }
}
