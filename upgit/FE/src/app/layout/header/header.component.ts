import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {LogoutService} from '../../user/service/logout.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {AuthService} from '../../user/service/auth.service';
import {CommonService} from '../../user/service/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public role: string;
  public username = '';
  public loginStatus: any;
  messageReceived: any;
  private subscriptionName: Subscription;
  public buttonLogoutStatus = true;

  constructor(private logoutService: LogoutService,
              private toastrService: ToastrService,
              private router: Router,
              private authService: AuthService,
              private commonService: CommonService) {
    this.authService.checkLogin().subscribe(value => {
      this.loginStatus = value;
      this.role = this.readLocalStorage('role');
      this.username = this.readLocalStorage('username');
    }, error => {
      localStorage.clear();
    });
    this.subscriptionName = this.commonService.getUpdate().subscribe(message => {
      this.messageReceived = message;
      this.role = this.readLocalStorage('role');
      this.username = this.readLocalStorage('username');
      this.authService.checkLogin().subscribe(value => {
        this.loginStatus = value;
      }, error => {
        localStorage.clear();
      });
    });
  }

  ngOnInit(): void {
  }

  readLocalStorage(key: string): string {
    return localStorage.getItem(key);
  }

  onLogout() {
    this.buttonLogoutStatus = false;
    this.logoutService.onLogout().subscribe(() => {
      setTimeout(() => {
        this.router.navigateByUrl('/login').then(() => {
          this.toastrService.success('Đăng xuất thành công!');
          this.buttonLogoutStatus = true;
        });
        localStorage.clear();
        this.sendMessage();
      }, 2000);
    }, error => {
      setTimeout(() => {
        this.router.navigateByUrl('/login').then(() => {
          this.toastrService.warning('Có vẻ như bạn đã hết phiên đăng nhập. Vui lòng đăng nhập lại!');
          this.buttonLogoutStatus = true;
        });
        localStorage.clear();
        this.sendMessage();
      }, 2000);

    }, () => {
    });
  }

  ngOnDestroy(): void {
    this.subscriptionName.unsubscribe();
  }

  sendMessage(): void {
    // send message to subscribers via observable subject
    this.commonService.sendUpdate('Đăng Xuất thành công!');
  }
}
