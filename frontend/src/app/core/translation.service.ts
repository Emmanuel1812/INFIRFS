import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TranslationService {
    currentLang = signal<'nl' | 'en'>('nl');

    private dictionaries = {
        'en': {
            'NAV_HOME': 'Catalog',
            'NAV_CART': 'Cart',
            'NAV_LOGIN': 'Login',
            'NAV_HISTORY': 'Orders',
            'NAV_ADMIN': 'Admin',
            'NAV_PROFILE': 'Profile',
            'BTN_ADD_CART': 'Add to Cart',
            'BTN_CHECKOUT': 'Checkout',
            'TXT_TOTAL': 'Total:',
            'TXT_NO_ITEMS': 'No items in cart.',
            'LBL_COLOR_BLIND': 'Color Blindness Accessibility Active',
            'TXT_SEARCH_PLACEHOLDER': 'Search products...',
            'BTN_SEARCH': 'Search',
            'BTN_DETAILS': 'Details',
            'BTN_BACK': 'Back',
            'TXT_LOADING': 'Loading...',
            'AUTH_WELCOME': 'Welcome Back!',
            'AUTH_LOGGED_IN': 'You are currently logged in.',
            'AUTH_LOGOUT': 'Logout',
            'AUTH_LOGIN': 'Login to your account',
            'AUTH_REGISTER': 'Create an account',
            'AUTH_FN': 'First Name',
            'AUTH_LN': 'Last Name',
            'AUTH_EMAIL': 'Email',
            'AUTH_PWD': 'Password',
            'BTN_LOGIN': 'Login',
            'BTN_REG': 'Register',
            'AUTH_TOGGLE_REG': 'Don\'t have an account? Register here.',
            'AUTH_TOGGLE_LOG': 'Already have an account? Login here.',
            'CART_SHOP': 'Go to Shop',
            'CART_PROD': 'Product',
            'CART_PRICE': 'Price',
            'CART_QTY': 'Quantity',
            'CART_SUB': 'Subtotal',
            'CART_ACT': 'Action',
            'BTN_RMV': 'Remove',
            'PROF_TITLE': 'Update Profile',
            'PROF_CANT': 'Email cannot be changed.',
            'BTN_SAVE': 'Save Changes'
        },
        'nl': {
            'NAV_HOME': 'Catalogus',
            'NAV_CART': 'Winkelmand',
            'NAV_LOGIN': 'Inloggen',
            'NAV_HISTORY': 'Bestellingen',
            'NAV_ADMIN': 'Beheer',
            'NAV_PROFILE': 'Profiel',
            'BTN_ADD_CART': 'In Winkelmand',
            'BTN_CHECKOUT': 'Afrekenen',
            'TXT_TOTAL': 'Totaal:',
            'TXT_NO_ITEMS': 'Geen items in winkelmand.',
            'LBL_COLOR_BLIND': 'Kleurenblindheid Toegankelijkheid Actief',
            'TXT_SEARCH_PLACEHOLDER': 'Zoek producten...',
            'BTN_SEARCH': 'Zoeken',
            'BTN_DETAILS': 'Details',
            'BTN_BACK': 'Terug',
            'TXT_LOADING': 'Laden...',
            'AUTH_WELCOME': 'Welkom Terug!',
            'AUTH_LOGGED_IN': 'Je bent momenteel ingelogd.',
            'AUTH_LOGOUT': 'Uitloggen',
            'AUTH_LOGIN': 'Log in op je account',
            'AUTH_REGISTER': 'Maak een account aan',
            'AUTH_FN': 'Voornaam',
            'AUTH_LN': 'Achternaam',
            'AUTH_EMAIL': 'E-mailadres',
            'AUTH_PWD': 'Wachtwoord',
            'BTN_LOGIN': 'Inloggen',
            'BTN_REG': 'Registreren',
            'AUTH_TOGGLE_REG': 'Nog geen account? Registreer hier.',
            'AUTH_TOGGLE_LOG': 'Al een account? Log hier in.',
            'CART_SHOP': 'Naar de Winkel',
            'CART_PROD': 'Product',
            'CART_PRICE': 'Prijs',
            'CART_QTY': 'Aantal',
            'CART_SUB': 'Subtotaal',
            'CART_ACT': 'Actie',
            'BTN_RMV': 'Verwijder',
            'PROF_TITLE': 'Profiel Bijwerken',
            'PROF_CANT': 'E-mail kan niet worden gewijzigd.',
            'BTN_SAVE': 'Opslaan'
        }
    };

    toggleLanguage() {
        this.currentLang.set(this.currentLang() === 'nl' ? 'en' : 'nl');
    }

    translate(key: keyof typeof this.dictionaries['en']): string {
        return this.dictionaries[this.currentLang()][key] || key;
    }
}
