import { Overlay } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/service/user.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      declarations: [ LoginComponent ],
      providers:[FormBuilder,Overlay,MatSnackBar,
        {provide:UserService,useValue:mockUserService}
      ]
    })
    .compileComponents();
    
    mockUserService = jasmine.createSpyObj('UserService', ['user', 'tmpUser', 'getUserDetails', 'userDetails']);
    TestBed.configureTestingModule({
      declarations:[LoginComponent],
      providers:[FormsModule, FormBuilder,{
        provide:UserService,useValue:mockUserService
      }]
    })
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  

});
