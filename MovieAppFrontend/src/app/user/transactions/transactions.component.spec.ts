import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from 'src/app/service/user.service';

import { TransactionsComponent } from './transactions.component';

describe('TransactionsComponent', () => {
  let component: TransactionsComponent;
  let fixture: ComponentFixture<TransactionsComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let userDetail = {
    purchaseHistory: {
      trsactionDate: '',
      detail: '',
      type: '',
      amount: ''
    }
  }


  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('user service', ['userDetail', 'purchaseHistory']);
    await TestBed.configureTestingModule({
      declarations: [TransactionsComponent],
      providers: [HttpClientModule, { provide: UserService, useValue: mockUserService }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    mockUserService.userDetail = userDetail;
    expect(component).toBeTruthy();
  });
  
  it('Should get purchase history', () => {
    mockUserService.userDetail = userDetail;
    expect(mockUserService.userDetail).toEqual(userDetail);
  })
});
