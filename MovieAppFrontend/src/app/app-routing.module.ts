import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './home/about/about.component';
import { UserProfileGuard } from './guard/user-profile.guard';
import { HomepageComponent } from './home/homepage/homepage.component';
import { SearchComponent } from './movie/search/search.component';
import { MovieDetailComponent } from './movie/movie-detail/movie-detail.component';
import { ForgotPassComponent } from './user/forgot-pass/forgot-pass.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UpdateAvatarComponent } from './user/update-avatar/update-avatar.component';
import { UserprofileComponent } from './user/userprofile/userprofile.component';
import { VerifyAccountComponent } from './user/verify-account/verify-account.component';
import { ResendVerificationComponent } from './user/resend-verification/resend-verification.component';
import { SubscriptionGuard } from './guard/subscription.guard';
import { ServiceDownComponent } from './home/service-down/service-down.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { AdminGuard } from './guard/admin.guard';

const routes: Routes = [
  {path:"user",component:UserprofileComponent,canActivate:[UserProfileGuard]},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegistrationComponent},
  {path:"search/:query",component:SearchComponent},
  {path:"about",component:AboutComponent},
  {path:"forgot",component:ForgotPassComponent},
  {path:"movie/:id",component:MovieDetailComponent,canActivate:[SubscriptionGuard]},
  {path:"update",component:UpdateAvatarComponent},
  {path:"user/resend",component:ResendVerificationComponent},
  {path:"user/verify/:email",component:VerifyAccountComponent},
  {path:"service",component:ServiceDownComponent},
  {path:"admin",component:AdminProfileComponent,canActivate:[AdminGuard]},
  {path:"**",component:HomepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
