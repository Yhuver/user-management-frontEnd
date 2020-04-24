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

  listTaskByIdUser(idUser:number){
    return this.http.get<any>(this.Url+'taskUser', {
      headers: new HttpHeaders({ 'idUser': ''+idUser })
  });
  }

  listTaskExceptByUser(idUser:number){
    return this.http.get<any>(this.Url+'task/exceptByUser', {
      headers: new HttpHeaders({ 'idUser': ''+idUser })
  });
  }

  createTaskUser(taskUser:any){
    return this.http.post<any>(this.Url+'taskUser',taskUser);
  }

  deleteTaskUser(idTaskUser:number){
    return this.http.delete<any>(this.Url+'taskUser', {
      headers: new HttpHeaders({ 'idTaskUser': ''+idTaskUser })
  });
}



listProfileByIdUser(idUser:number){
  return this.http.get<any>(this.Url+'profileUser', {
    headers: new HttpHeaders({ 'idUser': ''+idUser })
});
}

listProfileExceptByUser(idUser:number){
  return this.http.get<any>(this.Url+'profile/exceptByUser', {
    headers: new HttpHeaders({ 'idUser': ''+idUser })
});
}

createProfileUser(profileUser:any){
  return this.http.post<any>(this.Url+'profileUser',profileUser);
}

deleteProfileUser(idProfileUser:number){
  return this.http.delete<any>(this.Url+'profileUser', {
    headers: new HttpHeaders({ 'idProfileUser': ''+idProfileUser })
});
}

}
