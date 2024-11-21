import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {UserFormComponent} from "./users/user-form/user-form.component";

const routes: Routes = [
  {
    path:"",
    component:UsersComponent
  },
  {
    path:"users",
    component:UsersComponent
  },
  {
    path:"users/add",
    component:UserFormComponent
  },
  {
    path:"users/:id",
    component:UserFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
