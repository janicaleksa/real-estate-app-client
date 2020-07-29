import { Component, OnInit } from '@angular/core';
import { UserLogin } from './user-login';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserProfile } from '../profile/user-profile'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  message: any;
  userLogin: UserLogin;
  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
    ])
  });

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.userLogin = new UserLogin('', '');
    this.message = null;                                             
  }

  checkRequiredValidation(attribute: string): boolean {
    return this.loginForm.get(attribute).hasError('required');
  }

  loginUser() {
    if(!this.checkRequiredValidation('username') && !this.checkRequiredValidation('password')) {
        this.authorizeUser(this.userLogin);
    }
  }

  authorizeUser(user: UserLogin) {
    this.http.get('http://localhost:9009/api/users/authenticate/' + user.username + '&' + user.password)
    .subscribe(
      data => { sessionStorage.setItem('access_token', JSON.stringify(data)) },
      error => { 
        this.showMessage('danger', error.error.message);
        sessionStorage.removeItem('user');
      },
      () => {
        this.http.get('http://localhost:9009/api/users/login/' + user.username + '&' + user.password)
        .subscribe(
          data => { 
            const loggedUser = <UserProfile>data;
            sessionStorage.setItem('user', JSON.stringify(loggedUser));
            this.showMessage('success', 'User has been successfully loged with username: ' + loggedUser.username);
           },
          error => { 
            this.showMessage('danger', error.error.message);
            sessionStorage.removeItem('user');
           },
          () => { console.log('finish!') }
        )
      }
    )
  }

  showMessage(messageType: string, messageText: string) {
    this.message = null;
    this.message = { type: messageType, text: messageText}
  }

  closeMessage(message: any) {
    this.message = null;
  }

  navigateToRegistration() {
    this.router.navigate(['/registration']);
  }

}
