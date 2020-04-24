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
  displayMoreTask:boolean=false;

  userIdSelect:number;
  listTaskUser:any[];
  listTask:any[];
  listProfileUser:any[];
  listProfile:any[];
  displayMoreProfile:boolean=false;

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
      alert(error.error.message)
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
      alert(error.error.message)
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
      alert(error.error.message)
    }
    )
  }

  register(){
    this.router.navigate(["add"]);
  }


  loadListProfileUser(idUser){
    this.service.listProfileByIdUser(idUser)
    .subscribe(data=>{
      this.listProfileUser=data.data;
    },error=>{
      alert(error.error.message)
    })
  }

  listProfileExceptByUser(idUser){
    this.service.listProfileExceptByUser(idUser)
    .subscribe(data=>{
      this.listProfile=data.data;
    },error=>{
      alert(error.error.message)
    })
  }


  initDisplayMoreProfile(user:ListUser){
    this.displayMoreProfile=true;
    this.listProfileExceptByUser(user.idUser);
    this.loadListProfileUser(user.idUser);
    this.userIdSelect=user.idUser;
  }


  updateCancelMoreProfile(){
    this.displayMoreProfile=false;
    this.userIdSelect=0;
  }


  registerProfileUser(idProfile){
    if(idProfile<0){
      alert("por favor seleccione un perfil si desea asosiar a usuario")
    }
    if(this.userIdSelect>0){
      this.service.createProfileUser({"idProfile":idProfile, "idUser":this.userIdSelect}).
      subscribe(data=>{
        if(data.message=="success"){
          alert("Se asocio un perfil al usuario con exito");
          this.listProfileExceptByUser(this.userIdSelect);
          this.loadListProfileUser(this.userIdSelect);
        }
      },error=>{
        alert(error.error.message)
      }
      )

    }
  }

  deleteProfileUser(idProfileUser){
    this.service.deleteProfileUser(idProfileUser).
    subscribe(data=>{
      if(data.message=="success"){
        alert("Se elimino con exito la relacion entre perfil y usuario");
        this.listProfileExceptByUser(this.userIdSelect);
        this.loadListProfileUser(this.userIdSelect);
      }
    },error=>{
      alert(error.error.message)
    }
    )
  }


  loadListTaskUser(idUser){
    this.service.listTaskByIdUser(idUser)
    .subscribe(data=>{
      this.listTaskUser=data.data;
    },error=>{
      alert(error.error.message)
    })
  }

  listTaskExceptByUser(idUser){
    this.service.listTaskExceptByUser(idUser)
    .subscribe(data=>{
      this.listTask=data.data;
    },error=>{
      alert(error.error.message)
    })
  }


  initDisplayMoreTask(user:ListUser){
    this.displayMoreTask=true;
    this.listTaskExceptByUser(user.idUser);
    this.loadListTaskUser(user.idUser);
    this.userIdSelect=user.idUser;
  }


  updateCancelMoreTask(){
    this.displayMoreTask=false;
    this.userIdSelect=0;
  }


  registerTaskUser(idTask){
    if(idTask<0){
      alert("por favor para seleccione una tarea si desea asosiar a usuario")
    }
    if(this.userIdSelect>0){
      this.service.createTaskUser({"idTask":idTask, "idUser":this.userIdSelect}).
      subscribe(data=>{
        if(data.message=="success"){
          alert("Se asocio la tarea al usuario con exito");
          this.listTaskExceptByUser(this.userIdSelect);
          this.loadListTaskUser(this.userIdSelect);
        }
      },error=>{
        alert(error.error.message)
      }
      )

    }
  }

  deleteTaskUser(idTaskUser){
    this.service.deleteTaskUser(idTaskUser).
    subscribe(data=>{
      if(data.message=="success"){
        alert("Se elimino con exito la relacion entre tarea y usuario");
        this.listTaskExceptByUser(this.userIdSelect);
        this.loadListTaskUser(this.userIdSelect);
      }
    },error=>{
      alert(error.error.message)
    }
    )
  }

}
