import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { defineLocale } from 'ngx-bootstrap/chronos';
import { koLocale } from 'ngx-bootstrap/locale';
import { ButtonsModule } from 'ngx-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SharedComponentsModule } from './components/shared/shared-components.module';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatrixTicketOrderComponent } from './components/tim/matrix-ticket-order.component';
import { MatrixTicketTypeComponent } from './components/tim/matrix-ticket-type.component';
import { ReportComponent } from './components/tim/report.component';
import { AnalyticsComponent } from './components/tim/analytics.component';
import { PageNotFoundComponent } from './components/pagenotfound/pagenotfound.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotificationComponent } from './components/notification/notification.component';
import { EntranceComponent } from './components/entrance/entrance.component';
import { EntranceTicketComponent } from './components/entrance/entrance-ticket.component';
import { CompanyListComponent } from './components/company/company-list.component';
import { CompanyDetailComponent } from './components/company/company-detail.component';
import { CompanyNewComponent } from './components/company/company-new.component';
import { UserComponent } from './components/user/user.component';
import { UserDetailComponent } from './components/user/user-detail.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminDetailComponent } from './components/admin/admin-detail.component';
import { AdminNewComponent } from './components/admin/admin-new.component';
import { AdminPasswordComponent } from './components/admin/admin-password.component';
import { ContentListComponent } from './components/content/content-list.component';
import { ContentDetailComponent } from './components/content/content-detail.component';
import { ContentGroupListComponent } from './components/content/content-group-list.component';
import { ContentGroupEditComponent } from './components/content/content-group-edit.component';
import { ContentGroupNewComponent } from './components/content/content-group-new.component';
import { ContentGroupTicketListComponent } from './components/content/content-group-ticket-list.component';
import { ContentGroupTicketSearchComponent } from './components/content/content-group-ticket-search.component';
import { ContentNewComponent } from './components/content/content-new.component';
import { ContentNewImageComponent } from './components/content/content-new-image.component';
import { TicketTypeListComponent } from './components/ticket/type-list.component';
import { TicketTypeDetailComponent } from './components/ticket/type-detail.component';
import { TicketTypeNewComponent } from './components/ticket/type-new.component';
import { TicketOrderListComponent } from './components/ticket/order-list.component';
import { TicketOrderDetailComponent } from './components/ticket/order-detail.component';
import { TicketOrderNewComponent } from './components/ticket/order-new.component';
import { TicketListComponent } from './components/ticket/ticket-list.component';
import { TicketDetailComponent } from './components/ticket/ticket-detail.component';
import { TicketRegisterComponent } from './components/ticket/ticket-register.component';
import { TicketLogListComponent } from './components/ticket/log-list.component';
import { TicketLogDetailComponent } from './components/ticket/log-detail.component';
import { PlaceListComponent } from './components/place/place-list.component';
import { PlaceDetailComponent } from './components/place/place-detail.component';
import { PlaceNewComponent } from './components/place/place-new.component';
import { QnaListComponent } from './components/qna/qna-list.component';
import { QnaDetailComponent } from './components/qna/qna-detail.component';
import { QnaNewComponent } from './components/qna/qna-new.component';
import { StatsComponent } from './components/stats/stats.component';
import { PaymentComponent } from './components/payment/payment.component';

import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { DashboardService } from './services/dashboard.service';
import { StatsService } from "./services/stats.service";
import { NotificationService } from './services/notification.service';
import { WebSocketService } from './services/websocket.service';
import { AdminService } from './services/admin.service';
import { UserService } from './services/user.service';
import { ContentService } from './services/content.service';
import { GroupService } from './services/group.service';
import { CompanyService } from './services/company.service';
import { TicketService } from './services/ticket.service';
import { PlaceService } from './services/place.service';
import { UtilService } from './services/util.service';
import { QnaService } from './services/qna.service';

import { DataFilterPipe } from './pipes/data-filter.pipe';
import { TIMService } from './services/tim.service';

defineLocale('ko', koLocale);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelcomeComponent,
    LoginComponent,
    DashboardComponent,
    MatrixTicketOrderComponent,
    MatrixTicketTypeComponent,
    ReportComponent,
    AnalyticsComponent,
    NotificationComponent,
    PageNotFoundComponent,
    SignupComponent,
    NotificationComponent,
    DataFilterPipe,
    EntranceComponent,
    EntranceTicketComponent,
    CompanyListComponent,
    CompanyDetailComponent,
    CompanyNewComponent,
    UserComponent,
    UserDetailComponent,
    AdminComponent,
    AdminDetailComponent,
    AdminNewComponent,
    AdminPasswordComponent,
    ContentListComponent,
    ContentDetailComponent,
    ContentNewComponent,
    ContentNewImageComponent,
    ContentGroupListComponent,
    ContentGroupEditComponent,
    ContentGroupNewComponent,
    ContentGroupTicketListComponent,
    ContentGroupTicketSearchComponent,
    TicketTypeListComponent,
    TicketTypeDetailComponent,
    TicketTypeNewComponent,
    TicketOrderListComponent,
    TicketOrderDetailComponent,
    TicketOrderNewComponent,
    TicketListComponent,
    TicketDetailComponent,
    TicketRegisterComponent,
    TicketLogListComponent,
    TicketLogDetailComponent,
    PlaceListComponent,
    PlaceDetailComponent,
    PlaceNewComponent,
    QnaListComponent,
    QnaDetailComponent,
    QnaNewComponent,
    StatsComponent,
    PaymentComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SimpleNotificationsModule,
    MomentModule,
    ChartModule,
    UiSwitchModule,
    ButtonsModule.forRoot(),
    SharedComponentsModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'en-US'
    },
    AuthGuard,
    AuthService,
    DashboardService,
    StatsService,
    TIMService,
    NotificationService,
    WebSocketService,
    AdminService,
    UserService,
    ContentService,
    GroupService,
    CompanyService,
    TicketService,
    PlaceService,
    UtilService,
    QnaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
