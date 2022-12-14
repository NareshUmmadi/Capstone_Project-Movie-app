import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NavBarComponent } from './nav-bar.component';
import { Renderer2 } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { UserprofileComponent } from 'src/app/user/userprofile/userprofile.component';
import { ExpansionCase } from '@angular/compiler';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;


  beforeEach(waitForAsync(() => {
    mockUserService = jasmine.createSpyObj('user service', ['isUserLoggedIn', 'isAdminLoggedIn', 'logOut'])

    TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        MatMenuModule,
        RouterTestingModule.withRoutes([{ path: 'user', component: UserprofileComponent }])
      ],
      providers: [Document, BreakpointObserver, Renderer2,
        { provide: UserService, useValue: mockUserService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should go to user profile page', () => {
    mockUserService.isUserLoggedIn.and.returnValue(true);
    component.goToUserProfilePage();
    expect(component).toBeTruthy();
  });

  it('should called sign out', () => {
    component.signOut();
    expect(mockUserService.logOut).toHaveBeenCalledTimes(1);
  })
});
