import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './home/nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HomepageComponent } from './home/homepage/homepage.component';
import { HttpClientModule } from '@angular/common/http';
import {MaterialModule} from './imports/material/material.module';
import { PlayComponent } from './movie/play/play.component';
import { ZoomHoverDirective } from './directives/zoom-hover.directive';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserprofileComponent } from './user/userprofile/userprofile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPassComponent } from './user/forgot-pass/forgot-pass.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MovieDetailComponent } from './movie/movie-detail/movie-detail.component';
import { UpdateAvatarComponent } from './user/update-avatar/update-avatar.component';
import { SearchComponent } from './movie/search/search.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { SubscriptionComponent } from './user/subscription/subscription.component';
import { VerifyAccountComponent } from './user/verify-account/verify-account.component';
import { ResendVerificationComponent } from './user/resend-verification/resend-verification.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { ServiceDownComponent } from './home/service-down/service-down.component';
import { GiveCreditsComponent } from './admin/give-credits/give-credits.component';
import { GiftSubscriptionComponent } from './admin/gift-subscription/gift-subscription.component';
import { AboutComponent } from './home/about/about.component';
import { TransactionsComponent } from './user/transactions/transactions.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomepageComponent,
    PlayComponent,
    ZoomHoverDirective,
    LoginComponent,
    RegistrationComponent,
    UserprofileComponent,
    ForgotPassComponent,
    MovieDetailComponent,
    UpdateAvatarComponent,
    ChangePasswordComponent,
    SubscriptionComponent,
    ChangePasswordComponent,
    SearchComponent,
    AboutComponent,
    VerifyAccountComponent,
    ResendVerificationComponent,
    AdminProfileComponent,
    ServiceDownComponent,
    GiveCreditsComponent,
    GiftSubscriptionComponent,
    TransactionsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    MaterialFileInputModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
