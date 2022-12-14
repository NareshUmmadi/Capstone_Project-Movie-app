import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { UserService } from './service/user.service';

describe('AppComponent', () => {
  let mockUserService: jasmine.SpyObj<UserService>;


  beforeEach(async () => {
    mockUserService=jasmine.createSpyObj('user service',['decodeTokenVerifyAndLogin']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        HttpClientModule, {provide:UserService,useValue:mockUserService}
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
