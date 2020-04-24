import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ListUser } from '../Models/listUser';
import { CreateUser } from '../Models/createUser';
import { UpdateUser } from '../Models/updateUser';
import { CreateTask } from '../Models/createTask';
import { UpdateTask } from '../Models/updateTask';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  Url='http://localhost:8080/api/v1/'

  getUsers(){
    return this.http.get<any>(this.Url+'user');
  }

  createUsers(user:CreateUser){
    return this.http.post<any>(this.Url+'user',user);
  }

  updateUser(user:UpdateUser){
    return this.http.put<any>(this.Url+'user',user);
  }

  deleteUser(idUser:number){
    return this.http.delete<any>(this.Url+'user', {
      headers: new HttpHeaders({ 'idUser': ''+idUser })
  });
  }

  getDependency(){
    return this.http.get<any>(this.Url+'dependency');
  }

  getTasks(){
    return this.http.get<any>(this.Url+'task');
  }

  createTasks(task:CreateTask){
    return this.http.post<any>(this.Url+'task',task);
  }

  updateTask(task:UpdateTask){
    return this.http.put<any>(this.Url+'task',task);
  }

  deleteTask(idTask:number){
    return this.http.delete<any>(this.Url+'task', {
      headers: new HttpHeaders({ 'idTask': ''+idTask })
  });
  }



}
