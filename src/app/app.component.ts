import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user-management-fontEnd';

  constructor(private router:Router){}

  managementUsers(){
    this.router.navigate(['listar']);
  }

  managementTasks(){
    this.router.navigate(['listTask']);
  }
}
