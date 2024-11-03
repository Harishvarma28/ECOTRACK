import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }
  isLoading: boolean = false;

  //starting and ending of loaders
  
  setloader(loader:boolean): void {
  this.isLoading=loader
  }

  getloader(): boolean {
    return this.isLoading
  }
}
