import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UserService } from 'src/app/service/user.service';

import { ResendVerificationComponent } from './resend-verification.component';

describe('ResendVerificationComponent', () => {
  let component: ResendVerificationComponent;
  let fixture: ComponentFixture<ResendVerificationComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;

  const matSnackBarStub = {
    open(){
      return{
        onAction: () => of({})
      }
    }
  }

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('userService', ['resendVerificationMail', 'tmpUser'])
    await TestBed.configureTestingModule({
      providers: [MatSnackBar, {provide:UserService, useValue: mockUserService}, {provide: MatSnackBar, useValue: matSnackBarStub}],
      declarations: [ ResendVerificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResendVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should resend verification mail', () => {
    mockUserService.resendVerificationMail.and.returnValue(of(true));
    component.resendMail();
    expect(mockUserService.resendVerificationMail).toHaveBeenCalledTimes(1);
  });
});
