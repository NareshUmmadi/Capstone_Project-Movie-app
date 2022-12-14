import { Overlay } from '@angular/cdk/overlay';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), HttpClientModule],
      declarations: [ RegistrationComponent ],
      providers:[FormBuilder,Overlay,MatSnackBar,
        {provide:UserService,useValue:mockUserService}
      ]
    })
    .compileComponents();

    mockUserService = jasmine.createSpyObj('UserService', ['user', 'tmpUser', 'getUserDetails', 'userDetails']);
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
