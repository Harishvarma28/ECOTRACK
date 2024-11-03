import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
  currenturl!:string;

  constructor(private router:Router,private authService:AuthService)
  {

  }

  ngOnInit(){

    //getting the current router url
    this.router.events.subscribe(value => {
      if(value instanceof NavigationEnd)
        this.currenturl=this.router.url.toString()
      //console.log("Current Route....",this.currenturl)
      });


  }
}
