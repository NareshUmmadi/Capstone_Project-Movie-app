import { Overlay } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { UserService } from 'src/app/service/user.service';

import { SubscriptionComponent } from './subscription.component';

describe('SubscriptionComponent', () => {
  let component: SubscriptionComponent;
  let fixture: ComponentFixture<SubscriptionComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let matDialogRefStub: jasmine.SpyObj<MatDialogRef<SubscriptionComponent>>;
  // let userDetail = {
  //   credits: {
  //     trsactionDate: '',
  //     detail: '',
  //     type: '',
  //     amount: ''
  //   }
  // }

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('user service', ['userDetail', 'getSubscription']);
    matDialogRefStub = jasmine.createSpyObj('mat-dialog', ['close']);
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MatDialogModule],
      declarations: [SubscriptionComponent],
      providers: [MatSnackBar, Overlay, FormBuilder, FormControl,
        { provide: UserService, useValue: mockUserService },
        { provide: MatDialogRef, useValue: matDialogRefStub }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should get subscription', ()=>{
    mockUserService.getSubscription.and.returnValue(of(true));
    component.getSubscription();
    expect(mockUserService.getSubscription).toHaveBeenCalledTimes(1);
  });
});
