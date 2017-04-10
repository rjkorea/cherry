import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

// 3rd party module
import { SimpleNotificationsModule } from 'angular2-notifications';
import { MomentModule } from 'angular2-moment';
import { ChartModule } from 'angular2-chartjs';
import { UiSwitchModule } from 'ng2-ui-switch';
import { DatepickerModule, TimepickerModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/pagenotfound/pagenotfound.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotificationComponent } from './components/notification/notification.component';
import { EntranceComponent } from './components/entrance/entrance.component';
import { UserComponent } from './components/user/user.component';
import { UserDetailComponent } from './components/user/user-detail.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminDetailComponent } from './components/admin/admin-detail.component';
import { ContentComponent } from './components/content/content.component';
import { ContentListComponent } from './components/content/content-list.component';
import { ContentDetailComponent } from './components/content/content-detail.component';
import { ContentNewComponent } from './components/content/content-new.component';
import { TicketTypeListComponent } from './components/ticket/type-list.component';
import { TicketTypeDetailComponent } from './components/ticket/type-detail.component';
import { TicketTypeNewComponent } from './components/ticket/type-new.component';
import { TicketOrderListComponent } from './components/ticket/order-list.component';
import { TicketOrderDetailComponent } from './components/ticket/order-detail.component';
import { TicketOrderNewComponent } from './components/ticket/order-new.component';

import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { DashboardService } from './services/dashboard.service';
import { NotificationService } from './services/notification.service';
import { WebSocketService } from './services/websocket.service';
import { AdminService } from './services/admin.service';
import { UserService } from './services/user.service';
import { ContentService } from './services/content.service';
import { TicketService } from './services/ticket.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { DataFilterPipe } from './pipes/data-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    NotificationComponent,
    PageNotFoundComponent,
    SignupComponent,
    NotificationComponent,
    DataFilterPipe,
    EntranceComponent,
    UserComponent,
    UserDetailComponent,
    AdminComponent,
    AdminDetailComponent,
    ContentComponent,
    ContentListComponent,
    ContentDetailComponent,
    ContentNewComponent,
    TicketTypeListComponent,
    TicketTypeDetailComponent,
    TicketTypeNewComponent,
    TicketOrderListComponent,
    TicketOrderDetailComponent,
    TicketOrderNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SimpleNotificationsModule,
    MomentModule,
    ChartModule,
    UiSwitchModule,
    DatepickerModule.forRoot(),
    TimepickerModule.forRoot()
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'en-US'
    },
    AuthGuard,
    AuthService,
    DashboardService,
    NotificationService,
    WebSocketService,
    AdminService,
    UserService,
    ContentService,
    TicketService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
