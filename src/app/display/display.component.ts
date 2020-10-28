import { Component, OnInit } from '@angular/core';
import { TaskServiceService } from '../task-service.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  list;
  searchText = '';
  constructor(
    private taskServiceService: TaskServiceService,
  ) { }

  ngOnInit(): void {
    this.displayList();
  }
  deleteTask(data) {
    this.taskServiceService.deleteTask(data).subscribe(
      data => {
        this.displayList();
      }
    )
  }
  displayList() {
    this.taskServiceService.getAllTask().subscribe(
      data => {
        this.list = data
      }
    )
  }

  sortBasedonPriorty() {
    this.list.tasks = this.list.tasks.sort(function (a, b) { return a.priority - b.priority });

  }
  sortBasedondate() {
    this.list.tasks = this.list.tasks.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(a.due_date).valueOf() - new Date(b.due_date).valueOf() ;
    });

  }

}
