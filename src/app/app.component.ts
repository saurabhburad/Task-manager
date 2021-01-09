import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';

import { User } from './_models/user';
import { AuthenticationService } from './_services/authentication.service';
import { LoadingService } from './_services/loading-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;
  loading: boolean = false;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService,
      private _loading: LoadingService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      this.listenToLoading();

  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }

    /**
   * Listen to the loadingSub property in the LoadingService class. This drives the
   * display of the loading spinner.
   */
  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }
}
