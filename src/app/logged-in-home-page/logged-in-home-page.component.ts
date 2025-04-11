import { Component, OnInit } from '@angular/core';
import { User } from '../interface/interface';
import { ServiceService } from '../service/service.service';
import { Router, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-logged-in-home-page',
  imports: [RouterLink, NgFor],
  templateUrl: './logged-in-home-page.component.html',
  styleUrl: './logged-in-home-page.component.scss'
})
export class LoggedInHomePageComponent implements OnInit {
  
  userArr: User[] = [];

  constructor(private service: ServiceService, private router: Router){}

  ngOnInit(): void {
    this.fetchUser();
  }

  fetchUser() {
    this.service.getUser().subscribe({ next: (res: User[]) =>{
      this.userArr = res.filter(user => user.role !== 'admin');
    },
    error: (err: any) =>{
      console.log(err, 'an error was detected while accessing to data.');
    }
  })
  }

  logOut() {
    this.service.setCurrentUser(null);
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
  }

  
  goToProfile() {
    const currentUser = this.service.getCurrentUser();
    if (currentUser) {
      this.router.navigate([`/detail/${currentUser.id}`], {
        queryParams: { source: 'loggedInHmPg' }
      });
    }  
  }

}
