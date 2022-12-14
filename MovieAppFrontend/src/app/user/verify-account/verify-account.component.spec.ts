import { Overlay } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/service/user.service';

import { VerifyAccountComponent } from './verify-account.component';

describe('VerifyAccountComponent', () => {
  let component: VerifyAccountComponent;
  let fixture: ComponentFixture<VerifyAccountComponent>;
  let mockUserService:jasmine.SpyObj<UserService>;
  

  beforeEach(async () => {
    mockUserService=jasmine.createSpyObj('user service',['activateAccount']);
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      declarations: [ VerifyAccountComponent ],
      providers: [Overlay, MatSnackBar,
        {provide:UserService,useValue:mockUserService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call active accout method', () => {
    expect(mockUserService.activateAccount).toHaveBeenCalledTimes(1);
  });
});
