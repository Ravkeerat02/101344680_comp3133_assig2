import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AddComponent } from './add/add.component';


const routes: Routes = [
  {path:'',component:LoginComponent},
  { path: '/create', component: CreateComponent },
  { path: '/signup', component: SignupComponent },
  { path: '/list', component: ListComponent },
  {path: '/add', component: AddComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
