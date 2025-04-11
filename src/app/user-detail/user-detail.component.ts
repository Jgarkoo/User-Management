import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { User } from '../interface/interface';
import { NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-detail',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit{

  user!: User 
  source: string = '';
  id: string
  isOwner: boolean = false;
  showEditForm: boolean = false;
  showPassword: boolean = false;

  cUserForm = new FormGroup ({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    mail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  constructor(private route: ActivatedRoute, private service: ServiceService, private router: Router){
    this.id = this.route.snapshot.paramMap.get('id') || ' ';
  }
  
  ngOnInit(): void {
    this.source = this.route.snapshot.queryParamMap.get('source') || 'home';
    this.fetchUser();
  }

  fetchUser() {
    this.service.getSingleUser(this.id).subscribe({
      next: (res: User) => {
        this.user = res;
        const loggedInUser = this.service.getCurrentUser();
        if (loggedInUser) {
          this.isOwner = loggedInUser.id === this.user.id || loggedInUser.role === 'admin';
        }
      },
      error: (err) => {
        console.error('Error fetching user:', err);
      }
    });
  }
   

  goBack() {
    if (this.source === 'loggedInHmPg') {
      this.router.navigate(['/loggedInHmPg']);
    } else {
      this.router.navigate(['/home']);
    } 
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleEdit() {
    this.showEditForm = !this.showEditForm;
    if (this.showEditForm && this.user) {
      this.cUserForm.patchValue({
        name: this.user.name,
        mail: this.user.mail,
        password: this.user.password
      });
    }
  }

  deleteUser() {
    if (confirm('Are you sure you want to delete this user?')) {
      this.service.deleteUser(this.user.id).subscribe({
        next: () => {
          alert('User deleted successfully');
          const currentUser = this.service.getCurrentUser();
          if (currentUser && currentUser.id === this.user.id) {
            this.service.setCurrentUser(null);
            localStorage.removeItem('user');
            this.router.navigate(['/home']);
          } else {
            this.router.navigate(['/loggedInHmPg']);
          }
        },
        error: (err) => {
          console.error('Error deleting user:', err);
        }
      });
    }
  }
  
  submitEdit() {
    if (!this.cUserForm.valid) return;
  
    const updatedUser: User = {
      id: this.user.id,
      name: this.cUserForm.value.name!,
      mail: this.cUserForm.value.mail!,
      password: this.cUserForm.value.password!
    };
  
    this.service.updateUser(this.user.id, updatedUser).subscribe({
      next: (res) => {
        this.user = res; 
        this.showEditForm = false;
      },
      error: (err) => {
        console.error('Error updating user:', err);
      }
    });
  }
  
  get name(){
    return this.cUserForm.controls['name']
  }
  
  get mail(){
    return this.cUserForm.controls['mail']
  }
  
  get password(){
    return this.cUserForm.controls['password']
  } 
}
