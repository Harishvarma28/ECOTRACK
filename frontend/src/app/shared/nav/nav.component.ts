import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  showLogoutButton = true; // By default, the logout button is shown
  isDropdownOpen = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Check the current route and hide the logout button if on login/signup
    this.router.events.subscribe(() => {
      const currentUrl = this.router.url;
      this.showLogoutButton = !(currentUrl.includes('login') || currentUrl.includes('signup'));
    });
  }

  logout() {
    // Perform logout logic (clear user data, etc.)
    localStorage.removeItem('userToken');
    sessionStorage.clear();
    
    // Navigate to the login page
    this.router.navigate(['/auth/login']);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

}
