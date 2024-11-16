import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  showLogoutButton = true; // By default, the logout button is shown
  isDropdownOpen = false;
  public username!: string;
  public role!:string

  constructor(private router: Router,private authservice:AuthService) {}

  ngOnInit(): void {
    // Check the current route and hide the logout button if on login/signup
    this.username = this.authservice.getUsername(); 
    this.role=this.authservice.getrole();
    this.router.events.subscribe(() => {
      const currentUrl = this.router.url;
      this.showLogoutButton = !(currentUrl.includes('login') || currentUrl.includes('signup'));
    });
    console.log("user name",this.username)
    
  }

  logout() {
    // Perform logout logic (clear user data, etc.)
    localStorage.removeItem('userToken');
    sessionStorage.clear();
    this.authservice.logout();
    // Navigate to the login page
    // this.router.navigate(['/dashboard/homepage']);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

}
