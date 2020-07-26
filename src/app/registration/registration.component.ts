import { Component, OnInit } from '@angular/core';
import { UserRegistration } from './user-registration';
import { FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  userRegistration: UserRegistration;
  registrationForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ])
  });

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.userRegistration = new UserRegistration('', '', '');                                             
  }

  checkEmailValidation(attribute: string): boolean {
    return this.registrationForm.get(attribute).hasError('email') && !this.checkRequiredValidation(attribute);
  }

  checkRequiredValidation(attribute: string): boolean {
    return this.registrationForm.get(attribute).hasError('required');
  }

  registerUser() {
    if(!this.checkEmailValidation('email') && !this.checkRequiredValidation('username') && !this.checkRequiredValidation('password')) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      this.http.post('http://localhost:9009/api/users/registration', this.userRegistration, httpOptions)
      .subscribe(
        error => console.log("Error: " + error)
      )
    }
  }
}
