import { Component, OnInit } from '@angular/core';
import { CreateTask } from 'src/app/Models/createTask';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Servicer/service.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {


  constructor(private router:Router, private service:ServiceService) { }

  task:CreateTask=new CreateTask();

  ngOnInit() {
    console.log(this.task)
    this.task.status=true;
  }

  save(){
    console.log(this.task)
    if(this.task.name==null||this.task.name==''){
      return alert("Debe agregar un nombre")
    }
    if(this.task.description==null||this.task.description==''){
      return alert("Debe agregar una descripcion")
    }
    if(this.task.duration==null||this.task.duration<1){
      return alert("La duración debe ser mayor a cero(0)")
    }
     this.service.createTasks(this.task)
    .subscribe(data=>{
      if(data.message=="success"){
        alert("Se registro con exito la tarea");
        this.router.navigate(["listTask"]);
      }
    },error=>{
      alert(error.error.message)
    })
  }

}
