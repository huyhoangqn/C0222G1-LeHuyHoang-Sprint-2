import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../service/auth.service';
import {map} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router,
              private toastrService: ToastrService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.checkLogin().pipe(map(value => {
      if (value) {
        this.router.navigateByUrl('/home').then(() => {
          this.toastrService.warning('Bạn đã đăng nhập rồi!');
        });
        return false;
      } else {
        localStorage.clear();
        return true;
      }
    }));
  }

}
