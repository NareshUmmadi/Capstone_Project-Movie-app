import { Overlay } from '@angular/cdk/overlay';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { UserService } from '../service/user.service';

import { SubscriptionGuard } from './subscription.guard';

describe('SubscriptionGuard', () => {
  let guard: SubscriptionGuard;
  let mockUserService:jasmine.SpyObj<UserService>;


  beforeEach(() => {
    mockUserService=jasmine.createSpyObj('user service',['user', 'userDetails', 'isAdminLoggedIn', 'isSubscriptionActive']);

    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      providers: [Overlay, MatSnackBar,
        {provide:UserService,useValue:mockUserService}
      ]
    });
    guard = TestBed.inject(SubscriptionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
