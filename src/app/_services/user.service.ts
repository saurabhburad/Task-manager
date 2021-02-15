import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { User } from '../_models/user';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return of([{"id":1,"name":"Core Drivers","users_resolved":5,"active":true,"image_url":"https:\/\/d1cuxz3dnd9slg.cloudfront.net\/assessments\/Core+Values+-+Cover+Photo.jpg___2020-05-15-14-13-06.jpg"},{"id":2,"name":"Core Drivers Leadership","users_resolved":15,"active":true,"image_url":"https:\/\/d1cuxz3dnd9slg.cloudfront.net\/assessments\/5e99afa479dcc_1587130276_57e058a2b9971726d2061a04a9fa118b.jpg"},{"id":3,"name":"Skills","users_resolved":25,"active":false,"image_url":"https:\/\/d1cuxz3dnd9slg.cloudfront.net\/assessments\/5e99afa4c1bd7_1587130276_f88fb576ab3e5724e1d6ed47a976163f.png"},{"id":4,"name":"Who are you?","users_resolved":45,"active":true,"image_url":"https:\/\/d1cuxz3dnd9slg.cloudfront.net\/assessments\/5e99afa479dcc_1587130276_57e058a2b9971726d2061a04a9fa118b.jpg"}])
    }

    usersInfo(id) {
        let params = new HttpParams();
        params = params.append('id', id);
        return of({"data":{"Agreeableness":40,"Drive":65,"Luck":30,"Openess":90},"type":"bar"})
    }

}