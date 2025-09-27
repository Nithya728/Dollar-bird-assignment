import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthModal } from '../auth-modal/auth-modal';
import { AuthService } from '../auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule,AuthModal,CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
 title = 'Angular Blog';
  isLoggedIn = false;
  currentUser: any = null;

  @ViewChild('authModal') authModal!: AuthModal;
  
  constructor(public authService: AuthService) {
    console.log('🏗️ Header component constructed');
    this.updateAuthState();
  }

  ngOnInit(): void {
    console.log('🔄 Header component initialized');
    this.updateAuthState();
  }

  updateAuthState(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.currentUser = this.authService.getCurrentUser();
    console.log('🔄 Auth state updated:', { 
      isLoggedIn: this.isLoggedIn, 
      user: this.currentUser?.name 
    });
  }

  onAuthSuccess(): void {
    console.log('🎉 Authentication successful event received');
    this.updateAuthState();
    alert('🎉 Welcome! Authentication successful.');
  }

  openLogin(): void {
    console.log('📱 Opening login modal');
    this.authModal.switchTab('login');
  }

  openSignup(): void {
    console.log('📱 Opening signup modal');
    this.authModal.switchTab('signup');
  }

  logout(): void {
    console.log('🚪 Logout initiated from header');
    if (confirm('Are you sure you want to logout?')) {
      this.authService.logout();
      this.updateAuthState();
      alert('👋 You have been logged out successfully!');
      console.log('✅ Logout completed');
    } else {
      console.log('❌ Logout cancelled by user');
    }
  }

  
  debugUsers(): void {
    console.log('🐛 Debug: All users in system');
    this.authService.getAllUsers();
  }
}