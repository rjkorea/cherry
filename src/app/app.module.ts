import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule }     from './app-routing.module';

// 3rd party module
import { UiSwitchModule } from 'angular2-ui-switch';
import { DataTableModule } from 'angular2-datatable';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { MomentModule } from 'angular2-moment';
import { ChartModule } from 'angular2-chartjs';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/pagenotfound/pagenotfound.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotificationComponent } from './components/notification/notification.component';
import { EntranceComponent } from './components/entrance/entrance.component';
import { InvitationComponent } from './components/invitation/invitation.component';
import { UserComponent } from './components/user/user.component';
import { UserDetailComponent } from './components/user/user-detail.component';

import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { DashboardService } from './services/dashboard.service';
import { InvitationService } from './services/invitation.service';
import { NotificationService } from './services/notification.service';
import { WebSocketService } from './services/websocket.service';
import { UserService } from './services/user.service';

import { CookieService } from 'angular2-cookie/services/cookies.service';

import { DataFilterPipe } from './pipes/data-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    NotificationComponent,
    PageNotFoundComponent,
    SignupComponent,
    NotificationComponent,
    DataFilterPipe,
    EntranceComponent,
    InvitationComponent,
    UserComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    UiSwitchModule,
    DataTableModule,
    SimpleNotificationsModule,
    MomentModule,
    ChartModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'en-US'
    },
    AuthGuard,
    AuthService,
    DashboardService,
    InvitationService,
    NotificationService,
    WebSocketService,
    UserService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
