import { Overlay } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormsModule, NgModel } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { LoginComponent } from '../login/login.component';

import { ForgotPassComponent } from './forgot-pass.component';

describe('ForgotPassComponent', () => {
  let component: ForgotPassComponent;
  let fixture: ComponentFixture<ForgotPassComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;

  const MatSnackBarStub = {
    open(){
      return {
        onAction: () => of({})
      }
    }
  }

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('userService', ['forgotPassword'])
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule.withRoutes([{path: 'login', component:LoginComponent}])],
      declarations: [ ForgotPassComponent ],
      providers:[FormsModule,NgModule, FormControl,FormBuilder,MatSnackBar,Overlay,{provide:UserService, useValue: mockUserService}, { provide: MatSnackBar , useValue: MatSnackBarStub }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should called Forgot Password when click on button & route to login page',() => {
    mockUserService.forgotPassword.and.returnValue(of(true));
    component.forgotPass();
    expect(mockUserService.forgotPassword).toHaveBeenCalledTimes(1);
  });
});
