import { Component, OnInit } from '@angular/core';
import { UserRegistration } from './user-registration';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  roles: any;
  message: any;
  userRegistration: UserRegistration;
  registrationForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
    role: new FormControl('', [
      Validators.required,
    ])
  });

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.userRegistration = new UserRegistration('', '', '');
    this.initRoles();
    this.message = null;                                             
  }

  initRoles(): void {
    this.http.get('http://localhost:9009/api/role')
    .subscribe(
      data => {
        this.roles = data;
        console.log(this.roles);
      }
    )
  }

  checkRequiredValidation(attribute: string): boolean {
    return this.registrationForm.get(attribute).hasError('required');
  }

  registerUser() {
    if(!this.checkRequiredValidation('username') && !this.checkRequiredValidation('password') && !this.checkRequiredValidation('role')) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      this.http.post('http://localhost:9009/api/users/registration', this.userRegistration, httpOptions)
      .subscribe(
        data => { this.showMessage('success', 'User has been registered successfully!') },
        error => { this.showMessage('danger', error.error.message) }
      )
    }
  }

  showMessage(messageType: string, messageText: string) {
    this.message = null;
    this.message = { type: messageType, text: messageText}
  }

  closeMessage(message: any) {
    this.message = null;
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
