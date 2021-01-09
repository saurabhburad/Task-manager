import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  usersInfo;
  
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,

  ) { }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };
  public barChartLabels = [];
  public barChartType = '';
  public barChartLegend = true;
  public barChartData = [
    {data: [], label: ''},
  ];

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.barChartData[0].label = 'ID = '+id;
    this.userService.usersInfo(id).subscribe(
      data => {
        this.barChartType = data['type'];
        for (var key of Object.keys(data['data'])) {
        this.barChartData[0].data.push(data['data'][key])
        this.barChartLabels.push(key)
      }
      }
    );
  }
}
