import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './user/list/list.component';
import { AddComponent } from './user/add/add.component';
import { ListComponent as ListComponentTask } from './task/list/list.component';
import { AddComponent as AddComponentTask } from './task/add/add.component';

const routes: Routes = [
  {path: 'listar', component:ListComponent},
  {path: 'add', component:AddComponent},
  {path: 'listTask', component:ListComponentTask},
  {path: 'addTask', component:AddComponentTask},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
