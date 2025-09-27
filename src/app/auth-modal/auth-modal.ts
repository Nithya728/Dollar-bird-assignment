import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, Output, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-auth-modal',
  imports: [CommonModule,FormsModule],
  templateUrl: './auth-modal.html',
  styleUrl: './auth-modal.css'
})
export class AuthModal {
activeTab: 'login' | 'signup' = 'login';
  loginData = { email: '', password: '' };
  signupData = { name: '', email: '', password: '', confirmPassword: '' };
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  @Output() authSuccess = new EventEmitter<void>();

  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  switchTab(tab: 'login' | 'signup'): void {
    this.activeTab = tab;
    this.clearMessages();
    this.loginData = { email: '', password: '' };
    this.signupData = { name: '', email: '', password: '', confirmPassword: '' };
    
    console.log(`Switched to ${tab} tab`);
  }

  onLogin(): void {
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = 'Please fill in all fields';
      this.showAlert('❌ Please fill in all fields');
      console.warn('Login attempt with empty fields');
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    
    console.log('Login attempt started:', { email: this.loginData.email });
    
    setTimeout(() => {
      if (this.authService.login(this.loginData.email, this.loginData.password)) {
        this.successMessage = 'Login successful!';
        this.showAlert('✅ Login successful!');
        console.log('✅ Login successful for user:', this.loginData.email);
        
        setTimeout(() => {
          this.closeModal();
          this.authSuccess.emit();
        }, 1000);
      } else {
        this.errorMessage = 'Invalid email or password';
        this.showAlert('❌ Invalid email or password');
        console.error('❌ Login failed for user:', this.loginData.email);
      }
      this.isLoading = false;
    }, 1000);
  }

  onSignup(): void {
    if (!this.signupData.name || !this.signupData.email || !this.signupData.password || !this.signupData.confirmPassword) {
      this.errorMessage = 'Please fill in all fields';
      this.showAlert('❌ Please fill in all fields');
      console.warn('Signup attempt with empty fields');
      return;
    }

    if (this.signupData.password !== this.signupData.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      this.showAlert('❌ Passwords do not match');
      console.warn('Password mismatch during signup');
      return;
    }

    if (this.signupData.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long';
      this.showAlert('❌ Password must be at least 6 characters long');
      console.warn('Password too short during signup');
      return;
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.signupData.email)) {
      this.errorMessage = 'Please enter a valid email address';
      this.showAlert('❌ Please enter a valid email address');
      console.warn('Invalid email format during signup:', this.signupData.email);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    console.log('Signup attempt started:', { 
      name: this.signupData.name, 
      email: this.signupData.email 
    });

    setTimeout(() => {
      if (this.authService.register(this.signupData.name, this.signupData.email, this.signupData.password)) {
        this.successMessage = 'Registration successful!';
        this.showAlert('✅ Registration successful!');
        console.log('✅ Registration successful for user:', this.signupData.email);
        
        setTimeout(() => {
          this.closeModal();
          this.authSuccess.emit();
        }, 1000);
      } else {
        this.errorMessage = 'Email already exists';
        this.showAlert('❌ Email already exists');
        console.error('❌ Registration failed - email already exists:', this.signupData.email);
      }
      this.isLoading = false;
    }, 1000);
  }

  private showAlert(message: string): void {
    if (this.isBrowser()) {
      alert(message);
    } else {
      console.log('ALERT (SSR):', message);
    }
  }

  closeModal(): void {
    console.log('Closing auth modal');
    
    if (!this.isBrowser()) {
      console.log('Cannot close modal in SSR environment');
      return;
    }
    
    const modal = document.getElementById('authModal');
    if (modal) {
      const backdrops = document.getElementsByClassName('modal-backdrop');
      for (let i = 0; i < backdrops.length; i++) {
        backdrops[i].remove();
      }
      
      
      document.body.classList.remove('modal-open');
      
      
      modal.style.display = 'none';
      modal.classList.remove('show');
      
     
      this.clearMessages();
      this.isLoading = false;
      
      console.log('Auth modal closed successfully');
    } else {
      console.warn('Auth modal element not found');
    }
  }

  clearMessages(): void {
    console.log('Clearing messages');
    this.errorMessage = '';
    this.successMessage = '';
  }
}