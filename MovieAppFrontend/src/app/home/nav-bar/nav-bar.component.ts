import { Component, ElementRef, Inject, Renderer2, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  darkMode:boolean=false;
  @ViewChild('footer')footer!:ElementRef;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(@Inject(DOCUMENT) private document: Document,private breakpointObserver: BreakpointObserver, public _user: UserService, private router: Router,private renderer:Renderer2) { }


  goToUserProfilePage() {
    if (this._user.isUserLoggedIn())
      this.router.navigate(['user']);
    else
      this.router.navigate(['admin']);
  }

  signOut() {
    this._user.logOut();
  }

  signIn() {
    this.router.navigate(['login']);
  }

  register() {
    this.router.navigate(['register']);
  }


  homepage(){
    this.router.navigate(['']);
  }

  changeToDarkTheme(){
    this.renderer.addClass(this.document.body,'alternate');
    this.renderer.addClass(this.footer.nativeElement,'footer_dark');
    this.darkMode=true;
  }

  changeToLightTheme(){
    this.renderer.removeClass(this.document.body,'alternate');
    this.renderer.removeClass(this.footer.nativeElement,'footer_dark');
    this.darkMode=false;
  }

}

