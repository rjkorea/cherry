import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReportComponent } from './components/report/report.component';
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
import { ContentNewComponent } from './components/content/content-new.component';
import { ContentGroupListComponent } from './components/content/content-group-list.component';
import { ContentGroupEditComponent } from './components/content/content-group-edit.component';
import { ContentGroupNewComponent } from './components/content/content-group-new.component';
import { ContentGroupTicketListComponent } from './components/content/content-group-ticket-list.component';
import { ContentGroupTicketSearchComponent } from './components/content/content-group-ticket-search.component';
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

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: DashboardComponent, canActivate: [AuthGuard] },

  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/:id', component: DashboardComponent, canActivate: [AuthGuard] },

  { path: 'report', component: ReportComponent, canActivate: [AuthGuard] },
  { path: 'report/:id', component: ReportComponent, canActivate: [AuthGuard] },

  { path: 'company', component: CompanyListComponent, canActivate: [AuthGuard] },
  { path: 'company/:id', component: CompanyDetailComponent, canActivate: [AuthGuard] },
  { path: 'companies/new', component: CompanyNewComponent, canActivate: [AuthGuard] },

  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'user/:id', component: UserDetailComponent, canActivate: [AuthGuard] },

  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'admin/:id', component: AdminDetailComponent, canActivate: [AuthGuard] },
  { path: 'admins/new', component: AdminNewComponent, canActivate: [AuthGuard] },
  { path: 'admin/:id/password', component: AdminPasswordComponent, canActivate: [AuthGuard] },

  { path: 'content', component: ContentListComponent, canActivate: [AuthGuard] },
  { path: 'content/:id', component: ContentDetailComponent, canActivate: [AuthGuard] },
  { path: 'contents/new', component: ContentNewComponent, canActivate: [AuthGuard] },
  { path: 'content/:content_oid/groups', component: ContentGroupListComponent, canActivate: [AuthGuard] },
  { path: 'content/:content_oid/group/:group_oid/edit', component: ContentGroupEditComponent, canActivate: [AuthGuard] },
  { path: 'content/:content_oid/group/new', component: ContentGroupNewComponent, canActivate: [AuthGuard] },
  { path: 'content/:content_oid/group/:group_oid/tickets', component: ContentGroupTicketListComponent, canActivate: [AuthGuard] },
  { path: 'content/:content_oid/group/search', component: ContentGroupTicketSearchComponent, canActivate: [AuthGuard] },

  { path: 'ticket/type', component: TicketTypeListComponent, canActivate: [AuthGuard] },
  { path: 'ticket/type/:id', component: TicketTypeDetailComponent, canActivate: [AuthGuard] },
  { path: 'ticket/types/new', component: TicketTypeNewComponent, canActivate: [AuthGuard] },

  { path: 'ticket/order', component: TicketOrderListComponent, canActivate: [AuthGuard] },
  { path: 'ticket/order/:id', component: TicketOrderDetailComponent, canActivate: [AuthGuard] },
  { path: 'ticket/orders/new', component: TicketOrderNewComponent, canActivate: [AuthGuard] },

  { path: 'ticket', component: TicketListComponent, canActivate: [AuthGuard] },
  { path: 'ticket/:id', component: TicketDetailComponent, canActivate: [AuthGuard] },
  { path: 'ticket/:id/register', component: TicketRegisterComponent, canActivate: [AuthGuard] },

  { path: 'tickets/log', component: TicketLogListComponent, canActivate: [AuthGuard] },
  { path: 'tickets/log/:id', component: TicketLogDetailComponent, canActivate: [AuthGuard] },

  { path: 'entrance', component: EntranceComponent, canActivate: [AuthGuard] },
  { path: 'entrance/ticket/:id', component: EntranceTicketComponent, canActivate: [AuthGuard]},

  { path: 'place', component: PlaceListComponent, canActivate: [AuthGuard] },
  { path: 'place/:id', component: PlaceDetailComponent, canActivate: [AuthGuard] },
  { path: 'places/new/:area', component: PlaceNewComponent, canActivate: [AuthGuard] },

  { path: 'qna', component: QnaListComponent, canActivate: [AuthGuard] },
  { path: 'qna/:id', component: QnaDetailComponent, canActivate: [AuthGuard]},
  { path: 'qnas/new', component: QnaNewComponent, canActivate: [AuthGuard]},

  { path: 'stats', component: StatsComponent, canActivate: [AuthGuard] },

  { path: 'pay', component: PaymentComponent, canActivate: [AuthGuard] },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile/:id', component: AdminDetailComponent, canActivate: [AuthGuard] },
  { path: 'notification', component: NotificationComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }

];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
