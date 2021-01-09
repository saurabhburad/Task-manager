import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../app/login/login.component';
import { HomeComponent } from '../app/home/home.component';
import { AuthGuard } from '../app/_helpers/auth.guard';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AdminComponent } from './admin/admin.component';
import { KanbanBoard } from './kanbanBoard/kanbanBoard.component';




const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'login/:id',component: UserDetailsComponent },
  { path: 'admin',component: AdminComponent },
  { path: 'jiraBoard',component: KanbanBoard },


  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
