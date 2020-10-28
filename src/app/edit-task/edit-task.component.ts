import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { TaskServiceService } from '../task-service.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  angForm: FormGroup;
  taskId;
  list;
  constructor(private fb: FormBuilder,
    private _Activatedroute: ActivatedRoute,
    private taskServiceService: TaskServiceService,
    private router: Router 
  ) {
  }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => {
      this.taskId = params.get('id');
      this.angForm = this.fb.group({
        message: [params.get('message'), Validators.required],
        assigned_to: [params.get('assigned_to')],
        priority: [params.get('priority')],
        due_date: [params.get('due_date')],
      });

    });
    this.displayList();
  }

  displayList() {
    this.taskServiceService.getList().subscribe(
      data => this.list = data,
      err => console.log(err)
    );
  }
  updateTask() {
    this.taskServiceService.updateTask(this.angForm.value,this.taskId ).subscribe(
      data => {
        this.router.navigate(['/second-component']);
      }
    );
  }
  setassignedTo(e) {
    console.log(e.value)
    this.assignedTo.setValue(e.target.value, {
      onlySelf: true
    })
  }
  get assignedTo() {
    return this.angForm.get('assigned_to');
  }

}
