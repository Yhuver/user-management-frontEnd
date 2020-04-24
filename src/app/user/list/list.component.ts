import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/Servicer/service.service';
import { Router } from '@angular/router';
import { ListUser } from 'src/app/Models/listUser';
import { UpdateUser } from 'src/app/Models/updateUser';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  listUsers:ListUser[];
  listDependency:any[];
  displayUpdate:boolean=false;
  user:UpdateUser=new UpdateUser();

  constructor(private service:ServiceService,
    private router:Router) { }

  ngOnInit() {
    this.loadListUser();
  }

  loadListUser(){
    this.service.getUsers()
    .subscribe(data=>{
      this.listUsers=data.data;
      console.log(this.listUsers)
    },error=>{
      alert(error.message)
    })

  }

  initDisplayUpdate(user:ListUser){
    this.displayUpdate=true
    this.user.idUser=user.idUser
    this.user.birthDate=user.birthDate;
    this.user.idDependency=user.idDependency;
    this.user.name=user.nameUser;
    this.user.status=user.status;

    this.service.getDependency()
    .subscribe(data=>{
      this.listDependency=data.data;

    });
  }

  updateCancel(){
    this.displayUpdate=false;
    this.user=new UpdateUser();
  }

  update(){
    if(this.user.name==null||this.user.name==''){
      return alert("!No se puedo actualiza! El campo nombre no puede estar vacio")
    }
    if(this.user.birthDate==null||this.user.birthDate==''){
      return alert("!No se puedo actualiza! El campo Fecha de nacimiento no puede estar vacio")
    }
    if(this.user.idDependency==null||this.user.idDependency==0){
      return alert("!No se puedo actualiza! Seleccione una dependencia")
    }

    this.service.updateUser(this.user)
    .subscribe(data=>{
      if(data.message=="success"){
        alert("Se actualizo con exito el usuario");
        this.displayUpdate=false;
        this.user=new UpdateUser();
        this.loadListUser();
      }
    },error=>{
      alert(error.message)
      this.displayUpdate=false;
      this.user=new UpdateUser();
    })
  }

  delete(idUser){
    this.service.deleteUser(idUser).
    subscribe(data=>{
      if(data.message=="success"){
        alert("Se elimino con exito el usuario");
        this.loadListUser();
      }
    },error=>{
      alert(error.message)
    }
    )
  }

  register(){
    this.router.navigate(["add"]);
  }


}
