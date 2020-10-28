import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayComponent } from './display/display.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

const routes: Routes = [
  { path: 'first-component', component: AddTaskComponent  },
  { path: 'second-component', component: DisplayComponent },
  { path: 'edit/:id/:assigned_to/:message/:due_date/:priority', component: EditTaskComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
