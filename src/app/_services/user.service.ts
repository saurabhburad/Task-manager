import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(`https://ds-test-api.herokuapp.com/api/userassessments`);
    }

    usersInfo(id) {
        let params = new HttpParams();
        params = params.append('id', id);
        return this.http.get(`https://ds-test-api.herokuapp.com/api/userassessment/graph`, {params: params});
    }

}