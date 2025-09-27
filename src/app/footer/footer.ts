import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterModule,FormsModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
 currentYear: number = new Date().getFullYear();
  showBackToTop = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showBackToTop = window.scrollY > 300;
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

newsletterEmail = '';


   onNewsletterSubmit(event: Event): void {
    event.preventDefault();
    
    if (this.newsletterEmail) {
      alert(`Thank you for subscribing with: ${this.newsletterEmail}`);
      console.log('Newsletter subscription:', this.newsletterEmail);
      this.newsletterEmail = ''; 
    } else {
      alert('Please enter a valid email address');
    }
  }
}