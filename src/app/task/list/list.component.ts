import { Component, OnInit } from '@angular/core';
import { ListTask } from 'src/app/Models/listTask';
import { UpdateTask } from 'src/app/Models/updateTask';
import { ServiceService } from 'src/app/Servicer/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  listTasks:ListTask[];
  listDependency:any[];
  displayUpdate:boolean=false;
  task:UpdateTask=new UpdateTask();

  constructor(private service:ServiceService,
    private router:Router) { }

  ngOnInit() {
    this.loadListTask();
  }

  loadListTask(){
    this.service.getTasks()
    .subscribe(data=>{
      this.listTasks=data.data;
      console.log(this.listTasks)
    },error=>{
      alert(error.message)
    })

  }

  initDisplayUpdate(task:ListTask){
    this.displayUpdate=true;
    this.task.idTask=task.idTask;
    this.task.name=task.nameTask;
    this.task.description=task.descriptionTask;
    this.task.status=task.statusTask;
    this.task.duration=task.durationTask;

  }

  updateCancel(){
    this.displayUpdate=false;
    this.task=new UpdateTask();
  }

  update(){
    if(this.task.name==null||this.task.name==''){
      return alert("!No se puedo actualiza! El campo nombre no puede estar vacio")
    }
    if(this.task.duration==null||this.task.duration==0){
      return alert("!No se puedo actualiza! El campo duracion deber ser mayor a cero(0)")
    }
    if(this.task.description==null||this.task.description==''){
      return alert("!No se puedo actualiza! El campo decripcion no puede estar vacio")
    }
    console.log(this.task)
    this.service.updateTask(this.task)
    .subscribe(data=>{
      if(data.message=="success"){
        alert("Se actualizo con exito la tarea");
        this.displayUpdate=false;
        this.task=new UpdateTask();
        this.loadListTask();
      }
    },error=>{
      alert(error.message)
      this.displayUpdate=false;
      this.task=new UpdateTask();
    })
  }

  delete(idTask){
    this.service.deleteTask(idTask).
    subscribe(data=>{
      if(data.message=="success"){
        alert("Se elimino con exito la Tarea");
        this.loadListTask();
      }
    },error=>{
      alert(error.message)
    }
    )
  }

  register(){
    this.router.navigate(["addTask"]);
  }

}
