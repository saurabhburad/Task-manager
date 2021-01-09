import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadAllUsers();
  }

  private loadAllUsers() {
    this.userService.getAll()
        .subscribe(users => this.users = users);
}

}
