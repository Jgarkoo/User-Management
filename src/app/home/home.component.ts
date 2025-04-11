import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { User } from '../interface/interface';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NgFor, NgIf, ReactiveFormsModule, NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy{
  
  isLoggedIn: boolean = false;
  userArr: User[] = [];
  showLogIn: boolean = false;
  

  
  logInForm = new FormGroup ({
    mail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  constructor(private service: ServiceService, private router: Router){}

  ngOnInit(): void {
    this.fetchUser();
  }

  ngOnDestroy(): void {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
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

  logInUser() {
    if (!this.logInForm.valid) return;
  
    const { mail, password } = this.logInForm.value;
  
    this.service.login(mail!, password!).subscribe({
      next: (res) => {
        
        if (res.length > 0) {
          const loggedUser = res[0];
  
          if (!loggedUser.role) {
            loggedUser.role = 'user';
          }
  
          this.isLoggedIn = true;
          this.service.setCurrentUser(loggedUser);
        } else {
          alert('Invalid email or password');
        }
      },
      error: (err) => {
        console.log('Login failed', err); 
      }
    });
  }

  showButton() {
    this.showLogIn = !this.showLogIn;
      if (this.showLogIn) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
  }

  navToLoggedhmPg(){
    this.router.navigate(['/loggedInHmPg']);
  }

  get mail(){
    return this.logInForm.controls['mail']
  }
  
  get password(){
    return this.logInForm.controls['password']
  }
}
