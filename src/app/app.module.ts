import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { UiSwitchModule } from 'angular2-ui-switch';
import { DataTableModule } from 'angular2-datatable';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { SignupComponent } from './signup/signup.component';
import { NotificationComponent } from './notification/notification.component';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { InvitationService } from './invitation.service';
import { NotificationService } from './notification.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NotificationComponent,
    PageNotFoundComponent,
    SignupComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    UiSwitchModule,
    DataTableModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'notification', component: NotificationComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: '**', component: PageNotFoundComponent }
    ])
  ],
  providers: [
    AuthGuard,
    AuthService,
    InvitationService,
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
