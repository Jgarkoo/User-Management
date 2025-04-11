import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interface/interface';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private currentUser: User | null = null;
  apiURL: string;

  constructor(private http: HttpClient,  @Inject(PLATFORM_ID) private platformId: Object) { 
    this.apiURL = 'http://localhost:3000/';
  }

  createUser(data: User): Observable<User[]>{
    return this.http.post<User[]>(`${this.apiURL}User` , data);
  }

  getUser(): Observable<User[]>{
    return this.http.get<User[]>(`${this.apiURL}User`);
  }

  getSingleUser(id: string): Observable<User>{
    return this.http.get<User>(`${this.apiURL}User/${id}`)
  }

  updateUser(id: string, data: User): Observable<User> {
    return this.http.put<User>(`${this.apiURL}User/${id}`, data);
  }
  
  login(mail: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiURL}User?mail=${mail}&password=${password}`);
  }
  

  setCurrentUser(user: User | null) {
    if (user) {
      this.currentUser = user;
      localStorage.setItem('user', JSON.stringify(user)); 
    } else {
      this.currentUser = null;
      localStorage.removeItem('user'); 
    }
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiURL}User/${id}`);
  }
  

  getCurrentUser(): User | null {
    if (isPlatformBrowser(this.platformId)) {
      return this.currentUser || JSON.parse(localStorage.getItem('user') || 'null');
    }
    return null; 
  }
}
