import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ListUser } from '../Models/listUser';
import { CreateUser } from '../Models/createUser';
import { UpdateUser } from '../Models/updateUser';

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



}
