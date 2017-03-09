import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// 3rd party module
import { UiSwitchModule } from 'angular2-ui-switch';
import { DataTableModule } from 'angular2-datatable';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { MomentModule } from 'angular2-moment';
import { ChartModule } from 'angular2-chartjs';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { SignupComponent } from './signup/signup.component';
import { NotificationComponent } from './notification/notification.component';
import { EntranceComponent } from './entrance/entrance.component';
import { InvitationComponent } from './invitation/invitation.component';
import { UserComponent } from './user/user.component';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { DashboardService } from './dashboard.service';
import { InvitationService } from './invitation.service';
import { NotificationService } from './notification.service';
import { WebSocketService } from './websocket.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { DataFilterPipe } from './data-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    NotificationComponent,
    PageNotFoundComponent,
    SignupComponent,
    NotificationComponent,
    DataFilterPipe,
    EntranceComponent,
    InvitationComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    UiSwitchModule,
    DataTableModule,
    SimpleNotificationsModule,
    MomentModule,
    ChartModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
      { path: 'invitation', component: InvitationComponent, canActivate: [AuthGuard] },
      { path: 'notification', component: NotificationComponent, canActivate: [AuthGuard] },
      { path: 'entrance', component: EntranceComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: '**', component: PageNotFoundComponent }
    ])
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
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
