import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }
  
  isUserLoggedIn() {
    let user = localStorage.getItem('authenticatedUser');
    return !(user === null);
  }

  logout() {
    localStorage.removeItem('authenticatedUser')
  }

  getUser() {
    let user = localStorage.getItem('authenticatedUser');
    return user;
  } 
} 
 