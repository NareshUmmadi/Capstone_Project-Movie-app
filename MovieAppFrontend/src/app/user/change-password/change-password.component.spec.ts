import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/service/user.service';
import { Overlay } from '@angular/cdk/overlay';
import { ChangePasswordComponent } from './change-password.component';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  let mockUserService:jasmine.SpyObj<UserService>;
  let mockDialog:jasmine.SpyObj<MatDialogRef<ChangePasswordComponent>>;

  beforeEach(async () => {
    mockUserService=jasmine.createSpyObj('user service',['verifyPassword','changePassword']);
    mockDialog=jasmine.createSpyObj('mat-dialog',['close']);
    await TestBed.configureTestingModule({
      imports:[BrowserAnimationsModule,MatDialogModule],
      declarations: [ ChangePasswordComponent ],
      providers:[FormBuilder,Overlay,MatSnackBar,
      {provide:UserService,useValue:mockUserService},
      { provide: MatDialogRef, useValue: {} },
      {provide:MatDialogRef,useValue:mockDialog}
    ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should validate user current password',()=>{
    let user={
      email:'new@gmail.com',
    }
    mockUserService.user=user;
    mockUserService.verifyPassword.and.returnValue(of());
    let control = new FormControl('');
    mockDialog.close.and.callFake(()=>{});
    component.validateCurrentPassword(control);
    expect(mockUserService.verifyPassword).toHaveBeenCalledTimes(1);

  });


  it('password is changed',()=>{
    let user={
      email:'new@gmail.com',
    }
    mockUserService.user=user;
    mockUserService.changePassword.and.returnValue(of(true));
    mockDialog.close.and.callFake(()=>{});
    component.changePassword();
    expect(mockUserService.changePassword).toHaveBeenCalledTimes(1);
  });


});
