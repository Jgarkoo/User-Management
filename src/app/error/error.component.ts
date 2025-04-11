import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent implements OnInit{

  source: string = '';

  constructor(private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.source = this.route.snapshot.queryParamMap.get('source') || 'home';
  }

  goBack() {
    if (this.source === 'loggedInHmPg') {
      this.router.navigate(['/loggedInHmPg']);
    } else {
      this.router.navigate(['/home']);
    } 
  }

}
