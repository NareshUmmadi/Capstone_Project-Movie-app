import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { UserService } from '../service/user.service';

import { AdminGuard } from './admin.guard';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let mockUserService:jasmine.SpyObj<UserService>;


  beforeEach(() => {
    mockUserService=jasmine.createSpyObj('user service',['user', 'userDetails', 'isAdminLoggedIn', 'isSubscriptionActive']);

    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      providers: [
        {provide:UserService,useValue:mockUserService}
      ]
    });
    guard = TestBed.inject(AdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
