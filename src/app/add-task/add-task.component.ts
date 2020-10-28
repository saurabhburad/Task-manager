import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskServiceService } from '../task-service.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  title = 'taskManager';
  list;
  angForm: FormGroup;
  constructor(private fb: FormBuilder, private taskServiceService: TaskServiceService,
    private router: Router  ) {
    this.createForm();
  }
  createForm() {
    this.angForm = this.fb.group({
      message: ['', Validators.required],
      assigned_to: [''],
      priority: ['',],
      due_date: [''],
    });
  }
  ngOnInit() {

    this.taskServiceService.getList().subscribe(
      data => this.list = data,
      err => console.log(err)
    );
  }
  createTask() {
    this.taskServiceService.createTask(this.angForm.value).subscribe(
      data => this.router.navigate(['/second-component']),
    ) 
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
