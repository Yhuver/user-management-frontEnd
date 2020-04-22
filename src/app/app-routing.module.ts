import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './user/list/list.component';
import { AddComponent } from './user/add/add.component';
import { EditComponent } from './user/edit/edit.component';


const routes: Routes = [
  {path: 'listar', component:ListComponent},
  {path: 'add', component:AddComponent},
  {path: 'edit', component:EditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
