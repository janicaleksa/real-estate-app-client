import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ShellComponent } from './shell/shell.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeRenterComponent } from './home-renter/home-renter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http'
import {MatRadioModule} from '@angular/material/radio';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from "@auth0/angular-jwt";
import { from } from 'rxjs';
import { HomeAdvertiserComponent } from './home-advertiser/home-advertiser.component';

export function tokenGetter() {
  return sessionStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    ShellComponent,
    ProfileComponent,
    HomeRenterComponent,
    HomeAdvertiserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule,
    MatRadioModule,
    NgbModule,
    JwtModule.forRoot({
      config : {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:9009'],
        disallowedRoutes: [
          'http://localhost:9009/api/role',
          'http://localhost:9009/api/users/registration',
          'http://localhost:9009/api/users/authenticate'
        ],
        authScheme: '',
        skipWhenExpired: true
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
