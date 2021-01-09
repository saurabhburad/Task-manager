import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskServiceService } from '../_services/task-service.service'

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})
export class KanbanBoard implements OnInit {
  tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose
  angForm: FormGroup;
  list: any;
  loading: boolean = false;

  constructor(private fb: FormBuilder,
    private taskServiceService: TaskServiceService) { }


  ngOnInit() {
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.tasks = [
    ];

    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.taskServiceService.getList().subscribe(
      data => this.list = data,
      err => console.log(err)
    );
    this.createForm();
    this.displayList();

  }

  displayList() {
    this.taskServiceService.getAllTask().subscribe(
      data => {
        console.log(data);
        for (let i = 0; i < data['tasks'].length; i++) {
          this.tasks.push(
            {
              name: data['tasks'][i].message,
              stage: 0,
              priority: data['tasks'][i].priority,
              id: data['tasks'][i].id
            },
          )
        }
        this.configureTasksForRendering();
      }
    )
  }

  createForm() {
    this.angForm = this.fb.group({
      message: ['', Validators.required],
      assigned_to: [''],
      priority: ['',],
      due_date: [''],
    });
  }

  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
  }

  generateTestId = (name) => {
    return name.split(' ').join('-');
  }

  createTask() {

    let btn = document.getElementById("create-task-input")['value'];
    let priority = document.getElementById("create-priority-input")['value'];

    if (btn) {
      this.tasks.push(
        { name: btn, stage: 0, priority: priority, id: 1 },
      )
    }
    document.getElementById("create-task-input")['value'] = '';
    this.configureTasksForRendering();

  }

  deleteTask(name, id) {
    this.taskServiceService.deleteTask(id).subscribe(
      data => {
        this.tasks = this.tasks.filter((item) =>
          name !== item.name
        );
        this.configureTasksForRendering();
      }
    )


  }
  forwardTask(name) {
    this.tasks = this.tasks.map((item) => {
      if (name === item.name && item.stage < 3) {
        item.stage++;
      }
      return item;
    });
    this.configureTasksForRendering();
  }


  backTask(name) {
    this.tasks = this.tasks.map((item) => {
      if (name === item.name && item.stage > 0) {
        item.stage--;
      }
      return item;
    });
    this.configureTasksForRendering();
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

interface Task {
  name: string;
  stage: number;
  priority: string;
  id: number;
}