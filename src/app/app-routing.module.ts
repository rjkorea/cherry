import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/pagenotfound/pagenotfound.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotificationComponent } from './components/notification/notification.component';
import { EntranceComponent } from './components/entrance/entrance.component';
import { InvitationComponent } from './components/invitation/invitation.component';
import { UserComponent } from './components/user/user.component';
import { UserDetailComponent } from './components/user/user-detail.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminDetailComponent } from './components/admin/admin-detail.component';
import { ContentComponent } from './components/content/content.component';
import { ContentListComponent } from './components/content/content-list.component';
import { ContentDetailComponent } from './components/content/content-detail.component';
import { ContentNewComponent } from './components/content/content-new.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'home', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'user/:id', component: UserDetailComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'admin/:id', component: AdminDetailComponent, canActivate: [AuthGuard] },

  // TODO: fix children routing
  // {
  //   path: 'content',
  //   component: ContentComponent,
  //   canActivate: [AuthGuard],
  //   children: [
  //     {
  //       path: '',
  //       children: [
  //         { path: '', component: ContentListComponent },
  //         { path: ':id', component: ContentDetailComponent },
  //         { path: 'new', component: ContentNewComponent }
  //       ]
  //     }
  //   ],
  //
  // },

  { path: 'content', component: ContentListComponent, canActivate: [AuthGuard] },
  { path: 'content/:id', component: ContentDetailComponent, canActivate: [AuthGuard] },
  { path: 'contents/new', component: ContentNewComponent, canActivate: [AuthGuard] },

  { path: 'invitation', component: InvitationComponent, canActivate: [AuthGuard] },
  { path: 'notification', component: NotificationComponent, canActivate: [AuthGuard] },
  { path: 'entrance', component: EntranceComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', component: PageNotFoundComponent }

];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
