import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private users = [
    { email: 'user@example.com', password: 'password123', name: 'John Doe' },
    { email: 'admin@example.com', password: 'admin123', name: 'Admin User' }
  ];

  private currentUser: any = null;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    console.log('AuthService initialized');
    
    if (this.isBrowser()) {
      this.getCurrentUser();
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private getLocalStorage(key: string): string | null {
    if (this.isBrowser()) {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        console.error('❌ Error accessing localStorage:', error);
        return null;
      }
    }
    return null;
  }

  private setLocalStorage(key: string, value: string): void {
    if (this.isBrowser()) {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        console.error('❌ Error setting localStorage:', error);
      }
    }
  }

  private removeLocalStorage(key: string): void {
    if (this.isBrowser()) {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('❌ Error removing from localStorage:', error);
      }
    }
  }

  login(email: string, password: string): boolean {
    console.log('🔐 Login attempt:', { email });
    
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser = user;
      this.setLocalStorage('currentUser', JSON.stringify(user));
      console.log('✅ Login successful for user:', user.name);
      return true;
    }
    
    console.error('❌ Login failed - invalid credentials for email:', email);
    return false;
  }

  register(name: string, email: string, password: string): boolean {
    console.log('👤 Registration attempt:', { name, email });
    
    
    const existingUser = this.users.find(u => u.email === email);
    if (existingUser) {
      console.error('❌ Registration failed - email already exists:', email);
      return false;
    }
    
    const newUser = { name, email, password };
    this.users.push(newUser);
    this.currentUser = newUser;
    this.setLocalStorage('currentUser', JSON.stringify(newUser));
    
    console.log('✅ Registration successful for user:', name);
    console.log('📊 Total users now:', this.users.length);
    return true;
  }

  logout(): void {
    console.log('🚪 Logging out user:', this.currentUser?.name);
    this.currentUser = null;
    this.removeLocalStorage('currentUser');
    console.log('✅ User logged out successfully');
  }

  getCurrentUser(): any {
    if (!this.currentUser) {
      try {
        const storedUser = this.getLocalStorage('currentUser');
        this.currentUser = storedUser ? JSON.parse(storedUser) : null;
        
        if (this.currentUser) {
          console.log('📱 User loaded from localStorage:', this.currentUser.name);
        } else {
          console.log('📱 No user found in localStorage');
        }
      } catch (error) {
        console.error('❌ Error parsing stored user:', error);
        this.currentUser = null;
      }
    }
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    const loggedIn = this.getCurrentUser() !== null;
    console.log('🔍 Login status check:', loggedIn ? 'Logged in' : 'Not logged in');
    return loggedIn;
  }

 
  getAllUsers(): any[] {
    console.log('📋 All registered users:', this.users);
    return this.users;
  }
}