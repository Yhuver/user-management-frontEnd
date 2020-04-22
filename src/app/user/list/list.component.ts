import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/Servicer/service.service';
import { Router } from '@angular/router';
import { ListUser } from 'src/app/Models/listUser';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  listUsers:ListUser[];

  constructor(private service:ServiceService,
    private router:Router) { }

  ngOnInit() {
    this.service.getUsers()
    .subscribe(data=>{
      this.listUsers=data.data;
      console.log(this.listUsers)
    })
  }

}
