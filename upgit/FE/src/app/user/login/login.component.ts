import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../service/login.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {Subscription} from 'rxjs';
import {CommonService} from '../service/common.service';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  messageReceived: any;
  private subscriptionName: Subscription;
  public passwordStatus = 'SHOW';
  public buttonLoginStatus = true;
  public activeLogin = false;
  public LoginFailCount = 0;
  public realTimeSecond = 0;
  public realTimeMinute = 2;

  constructor(private loginService: LoginService,
              private toastrService: ToastrService,
              private authService: AuthService,
              private router: Router,
              private commonService: CommonService) {
    const timePrevious = Number(sessionStorage.getItem('time'));

    // tslint:disable-next-line:triple-equals
    if (timePrevious != 0) {
      const realTimeInterval = setInterval(() => {
        const d = new Date();
        const hours: number = d.getHours();
        const minutes: number = d.getMinutes();
        const seconds: number = d.getSeconds();
        const timeNext = hours * 60 * 60 + minutes * 60 + seconds;
        if (timeNext - timePrevious >= 120) {
          this.activeLogin = true;
          clearInterval(realTimeInterval);
          this.realTimeSecond = 0;
          this.realTimeSecond = 0;
          sessionStorage.setItem('time', '0');
        }
        const realTime = ((timePrevious - timeNext) + 120);
        this.realTimeMinute = Math.floor(realTime / 60);
        this.realTimeSecond = realTime % 60;
      }, 1000);
    } else {
      this.activeLogin = true;
    }

    this.subscriptionName = this.commonService.getUpdate().subscribe(message => {
      this.messageReceived = message;
    });
  }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onLogin() {
    this.buttonLoginStatus = false;
    const account = this.loginForm.value;
    if (this.loginForm.valid && this.activeLogin) {
      this.loginService.goLogin(account).subscribe(value => {
        this.authService.isLogin(value);
        setTimeout(() => {
          this.router.navigateByUrl('/home').then(() => {
            this.toastrService.success('????ng nh???p th??nh c??ng!');
            this.buttonLoginStatus = true;
            this.sendMessage();
          });
        }, 2000);
      }, error => {
        this.buttonLoginStatus = true;
        this.LoginFailCount++;
        if (this.LoginFailCount >= 3) {
          const d = new Date();
          const hours = d.getHours();
          const minutes = d.getMinutes();
          const seconds: number = d.getSeconds();
          sessionStorage.setItem('time', String(hours * 60 * 60 + minutes * 60 + seconds));
          this.activeLogin = false;
          this.toastrService.error('B???n nh???p sai qu?? 3 l???n h??y th??? l???i sau ??t ph??t!');
          this.router.navigateByUrl('/home', {skipLocationChange: true}).then(() => {
            this.router.navigate([window.location.pathname]);
          });
        } else {
          this.toastrService.error('T??n ????ng nh???p ho???c m???t kh???u kh??ng ch??nh x??c! ' + this.LoginFailCount + ' l???n');
        }
      }, () => {
      });
    } else {
      this.buttonLoginStatus = true;
      this.checkErrorPassword();
      this.checkErrorUsername();
      if (this.loginForm.controls.username.invalid) {
        $('#username').focus();
        $('#field-username').css('border', '1px solid red');
        $('#field-password').css('border', 'none');
      } else if (this.loginForm.controls.password.invalid) {
        $('#password').focus();
        $('#field-password').css('border', '1px solid red');
        $('#field-username').css('border', 'none');
      }
    }
  }

  sendMessage(): void {
    // send message to subscribers via observable subject
    this.commonService.sendUpdate('????ng Nh???p th??nh c??ng!');
  }

  showPassword() {
    // tslint:disable-next-line:triple-equals
    if (this.passwordStatus == 'SHOW') {
      $('#password').attr('type', 'text');
      this.passwordStatus = 'HIDE';
      // tslint:disable-next-line:triple-equals
    } else if (this.passwordStatus == 'HIDE') {
      $('#password').attr('type', 'password');
      this.passwordStatus = 'SHOW';
    }
  }

  checkErrorPassword() {
    if (this.loginForm.controls.password.hasError('required')) {
      $('[data-toggle="password"]').popover('show');
    } else {
      $('[data-toggle="password"]').popover('hide');
    }
  }

  checkErrorUsername() {
    if (this.loginForm.controls.username.hasError('required')) {
      $('[data-toggle="username"]').popover('show');
    } else {
      $('[data-toggle="username"]').popover('hide');
    }
  }

  ngOnDestroy(): void {
    $('[data-toggle="password"]').popover('hide');
    $('[data-toggle="username"]').popover('hide');
  }
}
