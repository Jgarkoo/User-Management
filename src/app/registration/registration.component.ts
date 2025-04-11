import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { User } from '../interface/interface';

@Component({
  selector: 'app-registration',
  imports: [RouterLink, ReactiveFormsModule, NgClass, NgIf],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit {
 
  successMessage: boolean = false;

  regForm = new FormGroup ({
    name: new FormControl('',[Validators.required, Validators.minLength(4)]),
    mail: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(6)])
  })

  constructor(private service: ServiceService){}
  
  ngOnInit(): void {
    
  }

  addUser(){
    if (!this.regForm.valid) {
      return;
    }

    const request: User = {
      ...(this.regForm.value as User),
      role: 'user'
    };

    this.service.createUser(request).subscribe({
      next: (res) => {
        this.regForm.reset();
        this.successMessage = true;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  get name(){
    return this.regForm.controls['name']
  }
  
  get mail(){
    return this.regForm.controls['mail']
  }
  
  get password(){
    return this.regForm.controls['password']
  } 
}
