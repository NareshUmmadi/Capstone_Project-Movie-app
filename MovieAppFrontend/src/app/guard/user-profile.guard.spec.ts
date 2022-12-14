import { TestBed } from '@angular/core/testing';
import { UserProfileGuard } from './user-profile.guard';
import { UserService } from 'src/app/service/user.service';
import { RouterModule } from '@angular/router';


describe('UserProfileGuard', () => {
  let guard: UserProfileGuard;
  let mockUserService:jasmine.SpyObj<UserService>;


  beforeEach(() => {
    mockUserService=jasmine.createSpyObj('user service',['user']);

    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      providers: [
        {provide:UserService,useValue:mockUserService}
      ]
    });
    guard = TestBed.inject(UserProfileGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
