import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListUser } from '../Models/listUser';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  Url='http://localhost:8080/api/v1/'

  getUsers(){
    return this.http.get<any>(this.Url+'user')
  }
}
