import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
  currenturl!:string;

  constructor(private router:Router,private authService:AuthService,private toastr: ToastrService)
  {

  }

  ngOnInit(){

    //getting the current router url
    this.router.events.subscribe(value => {
      if(value instanceof NavigationEnd)
        this.currenturl=this.router.url.toString()
      //console.log("Current Route....",this.currenturl)
      // this.toastr.success('Toastr is working!', 'Success');
       
      // this.toastr.success('Toastr is working!', 'Success');

      });


  }
}
