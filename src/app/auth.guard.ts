import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ServiceService } from './service/service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private service: ServiceService, private router: Router) {}

  canActivate(): boolean {
    const currentUser = this.service.getCurrentUser();
    if (currentUser) {
      return true; 
    } else {
      this.router.navigate(['/home']); 
      return false;
    }
  }
}
