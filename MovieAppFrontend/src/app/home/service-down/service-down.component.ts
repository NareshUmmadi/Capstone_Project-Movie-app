import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-down',
  templateUrl: './service-down.component.html',
  styleUrls: ['./service-down.component.css']
})
export class ServiceDownComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  goToHomepage(){
    this.router.navigate(['']);
  }

}
