import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Servicer/service.service';
import { CreateUser } from 'src/app/Models/createUser';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  listDependency:any[];


  constructor(private router:Router, private service:ServiceService) { }

  user:CreateUser=new CreateUser();

  ngOnInit() {
    console.log(this.user)
    this.user.status=true;
    this.service.getDependency()
    .subscribe(data=>{
      this.listDependency=data.data;

    });
  }

  save(){
    console.log(this.user)
    if(this.user.name==null||this.user.name==''){
      return alert("Debe agregar un nombre")
    }
    if(this.user.birthDate==null||this.user.birthDate==''){
      return alert("Debe agregar una fecha de nacimiento")
    }
    if(this.user.idDependency==null||this.user.idDependency==0){
      return alert("Debe seleccionar una dependencia")
    }
     this.service.createUsers(this.user)
    .subscribe(data=>{
      if(data.message=="success"){
        alert("Se registro con exito la persona");
      }
      this.router.navigate(["listar"]);

    })
  }

}
