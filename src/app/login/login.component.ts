import { Component, OnInit } from '@angular/core';
import { UserLogin } from './user-login';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

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
      data => { console.log(data); },
      error => { console.log(error); },
      () => console.log('finish!')
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
