import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
interface Auth {
    isLoggedIn: boolean;
    role: string;
}

const authStorageKey = 'auth';

const defaultAuthStorage: {} = {
    isLoggedIn: false,
    role: 'null',
};

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    Auth: Auth;
    constructor(private storageService: StorageService) {
        this.Auth =
            storageService.getData(authStorageKey) || defaultAuthStorage;
        this.save();
    }

    save(): void {
        this.storageService.setData(authStorageKey, this.Auth);
    }

    getRole(): string {
        return this.Auth.role;
    }

    setRole(role: string): void {
        this.Auth.role = role;
        this.save();
    }

    getIsLoggedIn(): boolean {
        return this.Auth.isLoggedIn;
    }

    setIsLoggedIn(boolean: boolean): void {
        this.Auth.isLoggedIn = boolean;
        this.save();
    }
}
