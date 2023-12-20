import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  profilePic: string | null = localStorage.getItem('profilePic');
  user_name: string | null = localStorage.getItem('user_name');
  isMobileMenuOpen: boolean = false; // Track the mobile menu state

  constructor(private router: Router) {}

  logoutUser = () => {
    localStorage.clear();
    this.router.navigate(['/login']);
  };

  isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    return !!token;
  };

  // Use ViewChild to reference the mobile menu element
  @ViewChild('mobileMenuRef', { static: false }) mobileMenuRef!: ElementRef;

  // Method to toggle the mobile menu state
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // Method to close the mobile menu
  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  // Close the menu when clicking outside the mobile menu
  @HostListener('document:click', ['$event'])
  onClick(event: any) {
    if (
      this.isMobileMenuOpen &&
      !this.mobileMenuRef.nativeElement.contains(event.target)
    ) {
      this.closeMobileMenu();
    }
  }
}
