import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeRenterComponent } from './home-renter/home-renter.component';
import { HomeAdvertiserComponent } from './home-advertiser/home-advertiser.component';
import { AuthorizeGuard } from './guards/authorize.guard';

const routes: Route[] = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthorizeGuard], data: {role: ['RENTER', 'ADVERTISER']} },
  { path: 'home-renter', component: HomeRenterComponent, canActivate: [AuthorizeGuard], data: { role: ['RENTER'] } },
  { path: 'home-advertiser', component: HomeAdvertiserComponent, canActivate: [AuthorizeGuard], data: {role: ['ADVERTISER'] } },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
