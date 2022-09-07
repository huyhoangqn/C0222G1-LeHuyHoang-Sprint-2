import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) {
  }

  checkLogin(): Observable<boolean> {
    return this.httpClient.post<boolean>(API_URL + '/check/login', null);
  }

  isLogin(value: any) {
    if (this.isAdmin(value.grantList)) {
      localStorage.setItem('role', 'ROLE_ADMIN');
    } else if (this.isStaff(value.grantList)) {
      localStorage.setItem('role', 'ROLE_STAFF');
    } else {
      localStorage.setItem('role', 'ROLE_USER');
    }
    localStorage.setItem('username', value.username);
  }

  isAdmin(grantList: string[]): boolean {
    return grantList.some(value => {
      return value === 'ROLE_ADMIN';
    });
  }

  isStaff(grantList: string[]): boolean {
    return grantList.some(value => {
      return value === 'ROLE_STAFF';
    });
  }

  checkAdminRole(): Observable<string> {
    return this.httpClient.post<string>(API_URL + '/role/admin', null);
  }
}
