import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor(private http: HttpClient) { }


  getList() {
    return this.http.get('https://devza.com/tests/tasks/listusers');
  }
  createTask(param) {
    const form = this.formData(param)
    return this.http.post('https://devza.com/tests/tasks/create', form)
  }
  getAllTask() {
    return this.http.get('https://devza.com/tests/tasks/list');
  }
  deleteTask(id) {
    let formData = new FormData();
    formData.append("taskid", id);
    return this.http.post('https://devza.com/tests/tasks/delete', formData)
    
  }

  updateTask(param,taskId) {
    let form = this.formData(param)
    form.append("taskid",taskId);

    return this.http.post('https://devza.com/tests/tasks/update', form)
  }

  formData(param) {
    param.due_date = param.due_date ?  moment(param.due_date).format('YYYY-MM-DD HH:mm:ss'): null;
    let formData = new FormData();
    formData.append("message", param.message);
    formData.append("due_date", param.due_date);
    formData.append("priority", param.priority);
    formData.append("assigned_to", param.assigned_to);
    return formData;
  }
}
