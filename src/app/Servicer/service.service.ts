import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListUser } from '../Models/listUser';
import { CreateUser } from '../Models/createUser';

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

  getDependency(){
    return this.http.get<any>(this.Url+'dependency');
  }



}
