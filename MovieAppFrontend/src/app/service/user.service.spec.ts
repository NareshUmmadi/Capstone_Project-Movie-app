import { HttpClient, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HomepageComponent } from '../home/homepage/homepage.component';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpClientSpy:jasmine.SpyObj<HttpClient>;

  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule.withRoutes([{path:"",component:HomepageComponent}])]
    });
    let router=TestBed.get(Router);
    httpClientSpy = jasmine.createSpyObj('HttpClient',['get','put','delete','post']);
    service=new UserService(httpClientSpy,router);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register the user',()=>{
    httpClientSpy.post.and.returnValue(of(true));
    let formData:FormData=new FormData();
    service.registerUser(formData).subscribe((a)=>{
      expect(a).toEqual(true);
    });
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  });


  it('should login with correct details',()=>{
    let user={};
    httpClientSpy.post.and.returnValue(of(true));
    service.login(user).subscribe(a=>{
      expect(a).toEqual(true);
    });
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  });

  it('should get user details',()=>{
    let response=new HttpResponse({body:true});
    httpClientSpy.get.and.returnValue(of(response));
    service.getUserDetails("").subscribe(a=>{
     expect(a.body).toEqual(true);
    });
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });
  
  it('should update user details',()=>{
    httpClientSpy.put.and.returnValue(of(true));

    service.updateUserDetails("").subscribe((a:any)=>{
      expect(a).toEqual(true);
    });
    expect(httpClientSpy.put).toHaveBeenCalledTimes(1);
  });

  it('should delete account',()=>{
    httpClientSpy.delete.and.returnValue(of(true));
    service.deleteAccount("").subscribe((a:any)=>{
      expect(a).toEqual(true);
    });
    expect(httpClientSpy.delete).toHaveBeenCalledTimes(1);
  });

  it('should verify password',()=>{
    httpClientSpy.post.and.returnValue(of(true));
    service.verifyPassword("").subscribe((a:any)=>{
      expect(a).toEqual(true);
    });
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  });

  it('should activate account',()=>{
    httpClientSpy.post.and.returnValue(of(true));
    service.activateAccount("").subscribe((a:any)=>{
      expect(a).toEqual(true);
    });
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  });

  it('should update avatar',()=>{
    httpClientSpy.put.and.returnValue(of(true));
    service.updateAvatar("","").subscribe((a:any)=>{
      expect(a).toEqual(true);
    });
    expect(httpClientSpy.put).toHaveBeenCalledTimes(1);
  });

  it('should change user password',()=>{
    httpClientSpy.put.and.returnValue(of(true));
    service.changePassword("").subscribe((a:any)=>{
      expect(a).toEqual(true);
    });
    expect(httpClientSpy.put).toHaveBeenCalledTimes(1);
  });

  it('should change get subscription',()=>{
    httpClientSpy.post.and.returnValue(of(true));
    service.getSubscription("","").subscribe((a:any)=>{
      expect(a).toEqual(true);
    });
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  });

  it('should resend verification email',()=>{
    httpClientSpy.post.and.returnValue(of(true));
    service.resendVerificationMail("").subscribe((a:any)=>{
      expect(a).toEqual(true);
    });
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  });

  it('should check if user not logged in',()=>{
    service.user=null;
    let res=service.isUserLoggedIn();
    expect(res).toEqual(false);
  });

  it('should check if user logged in',()=>{
    let user={role:"USER"};
    service.user=user;
    let res= service.isUserLoggedIn();
    expect(res).toBeTruthy();
  })
  it('should check if admin not logged in',()=>{
    service.user=null;
    let res=service.isAdminLoggedIn();
    expect(res).toEqual(false);
  });

  it('should check if admin logged in',()=>{
    let user={role:"ADMIN"};
    service.user=user;
    let res= service.isAdminLoggedIn();
    expect(res).toBeTruthy();
  })

  it('should check if account activated',()=>{
    let user={role:"USER",isVerified:true};
    service.user=user;
    let res = service.isAccountActivated();
    expect(res).toBeTrue();
  });

  it('should check if subscription activated',()=>{
    let user={role:"USER",isVerified:true,subscription:{deactivationDate:Date.now()+10000}};
    service.userDetail=user;
    let res = service.isSubscriptionActive();
    expect(res).toBeTrue();
  });


  it('should check movie if present in watchlist',()=>{
    let movie={name:"abc",id:12};
    let user={role:"USER",isVerified:true,subscription:{deactivationDate:Date.now()+10000},
    watchlist:[movie]};
    service.userDetail=user;
    let res = service.isPresentInWatchlist(movie);
    expect(res).toBeTrue();
  });

  it('should check movie if not present in watchlist',()=>{
    let movie={name:"cde",id:12};
    let user={role:"USER",isVerified:true,subscription:{deactivationDate:Date.now()+10000},
    watchlist:[movie]};
    service.userDetail=user;
    let movie2={name:"cde",id:123};
    let res = service.isPresentInWatchlist(movie2);
    expect(res).toBeFalse();
  });

  it('should check movie if present in favourites',()=>{
    let movie={name:"abc",id:12};
    let user={role:"USER",isVerified:true,subscription:{deactivationDate:Date.now()+10000},
    favourites:[movie]};
    service.userDetail=user;
    let res = service.isPresentInFavourite(movie);
    expect(res).toBeTrue();
  });

  it('should logout user from current session',()=>{
    let user={role:"USER",isVerified:true,subscription:{deactivationDate:Date.now()+10000}};
    service.userDetail=user;
    service.logOut();
    expect(service.userDetail).toBe(null);
  });
});
